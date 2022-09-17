const puppeteer=require("puppeteer");
const loginlink="https://www.hackerrank.com/auth/login";
const browseropen=puppeteer.launch({headless:false, args: ['--start-maximized'], defaultViewport:null});
const answer=require('./codes')
//signup with temporary email id
const email="hevik90453@keyido.com";
const password="123456789";

let page;
browseropen.then(function(browserObj){
    let browseropenPromise=browserObj.pages();
    return browseropenPromise;
}).then(function(newtab){
    page=newtab[0];
    let HackerRankopenpromise=page.goto(loginlink);
    return HackerRankopenpromise;
 }).then(function(){
    let elementwait=page.waitForSelector('input[type="text"]');
    return elementwait;
}).then(function(){
    let typeEmailpromise=page.type("#input-1",email);
    return typeEmailpromise;
}).then(function(){
    let typePassPromise=page.type("#input-2",password)
    return typePassPromise
 }).then(function(){
    let submitPromise=page.click("button[data-analytics='LoginPassword']")
    return submitPromise
 }).then(function(){
     let clickPromise=waitAndClick("a[data-attr1='algorithms']",page)
     return clickPromise
 }).then(function(){
    let gotoWarmup=waitAndClick("input[value='warmup']",page)
    return gotoWarmup
 }).then(function(){
    let waitFor5SecondsPromise=page.waitForTimeout(5000);
    return waitFor5SecondsPromise;
 })
 .then(function(){
    let allChallengePromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:2000})    //$$ means querySelectorAll
    return allChallengePromise
}).then(function(questionArr){
    console.log(questionArr.length)
    let questionwillSolve=questionSolver(page,questionArr[0],answer[0])
    return questionwillSolve
}).then(function(){
    resolve()
}).then(function(error){
    reject()
})

function waitAndClick(selector,cpage){   //function for waiting and clicking the element
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cpage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel=cpage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).then(function(){
            reject()
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionwillbeClicked=question.click()
        questionwillbeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput') 
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10})
        }).then(function(){
            let ctrlpressdown=page.keyboard.down('Control')
            return ctrlpressdown
        }).then(function(){
            let Aispressed=page.keyboard.press('A',{delay:100})
            return Aispressed
        }).then(function(){
            let Xispressed=page.keyboard.press('X',{delay:100})
            return Xispressed
        }).then(function(){
            let ctrlisunpressed=page.keyboard.up('Control')
            return ctrlisunpressed
        }).then(function(){
            let mainEditorInFocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
             mainEditorInFocus
        }).then(function(){
            let ctrlpressdown=page.keyboard.down('Control')
            return ctrlpressdown
        }).then(function(){ //problem not slecting whole area
            let Aispressed=page.keyboard.press('A',{delay:100})  //doublr press a
            return Aispressed
        }).then(function(){
            let Aispressed=page.keyboard.press('A',{delay:100})
            return Aispressed
        })
        .then(function(){
            let Vispressed=page.keyboard.press('V',{delay:100})
            return Vispressed
        }).then(function(){
            let ctrlisunpressed=page.keyboard.up('Control')
            return ctrlisunpressed
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:50})
        })
    })
}