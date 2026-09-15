// Local browser checks with a mocked Google transport; no credentials or real Drive calls.
const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  const html=fs.readFileSync('apps-script/Index.html','utf8');
  await page.route('https://st-preview.test/**', route=>route.fulfill({contentType:'text/html',body:html}));
  await page.addInitScript(() => {
    window.google={script:{run:{
      withFailureHandler(fn){this.failure=fn;return this;},
      withSuccessHandler(fn){this.success=fn;return this;},
      getBootstrap(){const success=this.success;setTimeout(()=>success({ok:true,data:{
        user:{email:'josue@example.test'},settings:{workspaceRootFolderId:'demo',preferredPlaybackRate:1},
        globalConfig:{},cases:[
          {id:'line-1',name:'Bottling line · Baseline',equipmentCount:13,isSimulationReady:true,updatedAt:'2026-09-15T10:00:00Z'},
          {id:'line-2',name:'Secondary packaging',equipmentCount:7,isSimulationReady:false,updatedAt:'2026-09-14T10:00:00Z'},
          {id:'line-3',name:'Capacity expansion',equipmentCount:9,isSimulationReady:true,updatedAt:'2026-09-13T10:00:00Z'}
        ]
      }}),10);}
    }}};
  });
  await page.goto('https://st-preview.test');
  assert(await page.locator('#auth-panel').isVisible());
  assert(!(await page.locator('#application').isVisible()));
  await page.screenshot({path:'/tmp/st-login.png'});
  await page.check('#remember-session');
  await page.click('#sign-in-button');
  await page.waitForSelector('#application:visible');
  assert(!(await page.locator('#workspace-panel').isVisible()));
  assert(!(await page.locator('#engine-panel').isVisible()));
  assert.equal(await page.locator('.case-row').count(),3);
  await page.screenshot({path:'/tmp/st-cases-light.png'});
  await page.fill('#case-search','Capacity');
  assert.equal(await page.locator('.case-row').count(),1);
  await page.fill('#case-search','not found');
  assert.equal(await page.locator('.case-row').count(),0);
  await page.fill('#case-search','');
  await page.locator('[aria-label="Appearance"]').selectOption('dark');
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.screenshot({path:'/tmp/st-cases-dark.png'});
  await page.reload();
  await page.waitForSelector('#application:visible');
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.locator('[aria-label="Appearance"]').selectOption('auto');
  await page.emulateMedia({colorScheme:'light'});
  assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  await page.emulateMedia({colorScheme:'dark'});
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.click('#open-settings');
  assert(await page.locator('#workspace-panel').isVisible());
  await page.click('#home-cases');
  assert(!(await page.locator('#workspace-panel').isVisible()));
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'/tmp/st-mobile.png'});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.click('#sign-out');
  await page.reload();
  assert(await page.locator('#auth-panel').isVisible());
  await page.evaluate(()=>{google.script.run.getBootstrap=function(){this.failure();};});
  await page.click('#sign-in-button');
  assert(await page.locator('#auth-panel').isVisible());
  assert(!(await page.locator('#sign-in-button').isDisabled()));
  assert.match(await page.locator('#auth-status').textContent(),/NETWORK_ERROR/);
  assert.deepEqual(errors,[]);
  console.log('UI PASS: entry, remembered access, lock, cases-only home, search, themes, settings, mobile overflow, network failure; no browser errors.');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
