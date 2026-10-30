import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {preview} from 'vite';
import {chromium} from 'playwright';
const root=fileURLToPath(new URL('..',import.meta.url));process.chdir(root);
await fs.mkdir('test-results',{recursive:true});
const report={started:new Date().toISOString(),checks:[],pageErrors:[],scope:'Portal production build and offline showcase smoke checks; not full accessibility, domain or live integration acceptance.'};
let server,browser;
try{
 server=await preview({root,configFile:path.join(root,'vite.config.ts'),preview:{host:'127.0.0.1',port:0,strictPort:false,open:false}});
 const url='http://127.0.0.1:'+server.httpServer.address().port;
 browser=await chromium.launch({headless:true,chromiumSandbox:true});
 const c=await browser.newContext({viewport:{width:1360,height:1000},reducedMotion:'reduce',acceptDownloads:true});
 await c.route('**/*',r=>/^https?:/.test(r.request().url())&&!r.request().url().startsWith(url)?r.abort():r.continue());
 const page=await c.newPage();page.on('pageerror',e=>report.pageErrors.push(e.message));
 const login=async()=>{await page.getByPlaceholder('Enter demo').fill('demo');await page.getByPlaceholder('Enter your password').fill('demo');await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.locator('.fern-hero').waitFor();};
 const home=async()=>{const a=page.getByRole('link',{name:'FERN home',exact:true});if(await a.count())await a.click();else await page.getByRole('button',{name:'Home',exact:true}).first().click();await page.locator('.fern-hero').waitFor();};
 await page.goto(url);await login();report.checks.push('Production-format build: demonstration sign-in and homepage');
 assert.equal(await page.getByText('BHX4',{exact:true}).count(),0);
 assert.equal(await page.locator('.fern-app-grid article').count(),5);assert.equal(await page.locator('.fern-app-grid').getByText('Coming soon',{exact:true}).count(),5);assert.equal(await page.locator('.fern-app-grid').locator('button, a').count(),0);report.checks.push('Five application cards shown as Coming soon without launch controls; no homepage BHX4 label');
 assert.equal(await page.locator('#fern-home-app-items button:not([disabled])').count(),0);report.checks.push('Sidebar application entries are disabled');
 for(const title of ['Mission & Pillars','Leadership & Policy','FM Overview','Planning & Objectives','Performance & KPIs','Risk & Compliance','Audit & Assurance','Continual Improvement']){
  await page.locator('aside').getByRole('button',{name:title,exact:true}).click();await page.getByRole('heading',{name:title,exact:true}).first().waitFor();await page.locator('.fern-ai-search').waitFor();report.checks.push('Page and shared search: '+title);
 }
 const detail=page.locator('#fw-section-0');await detail.locator('summary').click();assert.equal(await detail.getAttribute('open'),'');await detail.locator('summary').click();assert.equal(await detail.getAttribute('open'),null);report.checks.push('Workspace disclosure opens and closes');
 await home();await page.getByRole('button',{name:'Get started',exact:true}).click();await page.getByRole('heading',{name:'Getting started with FERN',exact:true}).waitFor();report.checks.push('Get Started');
 for(const [label,heading] of [['Learn','Learn at your own pace'],['Help','Help & Guidance'],['Reference library','Reference library']]){await page.locator('.fern-home-header').getByRole('button',{name:label,exact:true}).click();await page.getByRole('heading',{name:heading,exact:true}).waitFor();report.checks.push('Resource page: '+heading);}
 const search=page.getByRole('searchbox',{name:'Search standards',exact:true});await search.fill('fire doors');await search.press('Enter');assert.match(await page.locator('.fs-result-row').first().innerText(),/CT.FIRE.DOORS/);await page.locator('.fs-result-row').first().click();await page.locator('.fs-reading').waitFor();
 for(const name of ['Download Selected Standard','Download full source PDF']){const ready=page.waitForEvent('download');await page.getByRole('button',{name,exact:true}).click();const d=await ready;const bytes=await fs.readFile(await d.path());assert.equal(bytes.subarray(0,5).toString(),'%PDF-');report.checks.push(name+': PDF bytes verified');}
 await page.locator('.fs-page-nav a').first().click();assert.equal(await page.locator('.fern-source-page').first().getAttribute('open'),'');await page.getByRole('button',{name:'← Back to Results',exact:true}).click();assert.equal(await search.inputValue(),'fire doors');report.checks.push('BBM exact result, source disclosure and preserved query on return');
 await home();await page.getByRole('searchbox',{name:'Find a FERN topic or guide',exact:true}).fill('standards');await page.getByRole('button',{name:'Search FERN',exact:true}).click();await page.locator('.fern-ai-search-results').getByRole('button',{name:'Reference Library',exact:true}).waitFor();assert.equal(await page.locator('#fern-help-question').count(),0);report.checks.push('Guidance keyword search; no unavailable assistant input');
 await page.screenshot({path:'test-results/handover-desktop.png'});
 await page.setViewportSize({width:390,height:844});const close=page.locator('.fern-close-menu');if(await close.isVisible())await close.click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);await page.locator('.fern-home-header>button').click();await close.waitFor();await page.screenshot({path:'test-results/handover-mobile-menu.png'});await close.click();report.checks.push('Mobile width and open/close menu');
 await page.goto('file://'+path.join(root,'dist-share','FERN-Internal-Portal.html'));await page.setViewportSize({width:1360,height:1000});await login();await page.locator('.fern-ai-search').waitFor();report.checks.push('Re-exported standalone HTML: file URL login, homepage and shared search');
 assert.deepEqual(report.pageErrors,[]);report.status='passed';
}catch(e){report.status='failed';report.error=e.message;process.exitCode=1;}
finally{if(browser)await browser.close();if(server)await new Promise(r=>server.httpServer.close(r));report.finished=new Date().toISOString();await fs.writeFile('test-results/portal-handover-browser.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
