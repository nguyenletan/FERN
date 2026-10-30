import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('test-results/homepage',{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.FERN_BROWSER_CHANNEL||'chrome'});
const page=await browser.newPage({viewport:{width:1536,height:1024}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const welcome=page.getByRole('heading',{name:'Welcome to FERN.',exact:true});
const signIn=async()=>{await page.getByPlaceholder('Enter demo').fill('demo');await page.getByPlaceholder('Enter your password').fill('demo');await page.getByRole('button',{name:'Sign in',exact:true}).click();await welcome.waitFor();};
const home=async()=>{await page.getByRole('link',{name:'FERN home'}).click();await welcome.waitFor();};
try{
 await page.goto(process.env.FERN_TEST_URL||'http://127.0.0.1:4173/');
 await signIn();
 await page.screenshot({path:'test-results/homepage/desktop.png'});
 const menu=page.getByRole('button',{name:'Show navigation'});
 assert.equal(await menu.getAttribute('aria-expanded'),'false');
 await menu.click();
 await page.locator('#fern-home-sidebar').getByRole('button',{name:'FM Overview',exact:true}).click();
 await page.getByRole('heading',{name:'FM Overview',exact:true}).first().waitFor();
 assert.equal(await welcome.count(),0);
 await home();
 await page.getByRole('searchbox',{name:'Find a FERN topic or guide'}).first().fill('pricing');await page.getByRole('button',{name:'Search FERN',exact:true}).first().click();await page.getByRole('heading',{name:'Search results'}).waitFor();
 await page.getByRole('button',{name:'Get started',exact:true}).click();await page.getByRole('region',{name:'Getting started with FERN'}).waitFor();
 await home();
 for(const name of ['Pre-Contract & Tender Assessment','Lifecycle & Asset Analysis','Contract & Service Model','Pricing Template Generator','Mobilisation & Transition Tracker']){
  await page.getByRole('button',{name:'About '+name,exact:true}).click();
  await page.getByRole('heading',{level:1,name}).waitFor();
  await page.getByRole('button',{name:'Return to Home'}).click();
  await welcome.waitFor();
 }
 await page.evaluate(()=>document.querySelector('main').scrollTop=99999);await page.screenshot({path:'test-results/homepage/desktop-bottom.png'});
 await page.setViewportSize({width:390,height:844});await page.reload();await signIn();
 assert.equal(await menu.getAttribute('aria-expanded'),'false');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'No mobile page overflow');
 await page.screenshot({path:'test-results/homepage/mobile.png'});
 await menu.click();await page.getByRole('button',{name:'Close menu',exact:true}).waitFor();await page.screenshot({path:'test-results/homepage/mobile-menu.png'});
 await page.getByRole('button',{name:'Close menu',exact:true}).click();await page.evaluate(()=>document.querySelector('main').scrollTop=99999);await page.screenshot({path:'test-results/homepage/mobile-bottom.png'});
 assert.deepEqual(errors,[]);fs.writeFileSync('test-results/homepage/result.json',JSON.stringify({passed:true,desktop:[1536,1024],mobile:[390,844],errors,checks:['menu','search','get started','five application introduction pages','mobile overflow','mobile menu']},null,2));
}finally{await browser.close();}
