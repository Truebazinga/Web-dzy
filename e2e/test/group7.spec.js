describe('add task', function () {
    let page;
    let newTaskContent;

    before (async function () {
        page = await browser.newPage();
        let random = new Date().getMilliseconds();
        newTaskContent = 'new todo item ' + random;
        await page.goto('http://127.0.0.1:80/');
    });

    after (async function () {
        await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('ToDo List');
    })

    it('should add new todo item correct', async function() {
        // 点击输入框
        await page.click('#myInput', {delay: 500});
        // 输入add todo事项
        await page.type('#myInput', newTaskContent, {delay: 50});
        // 回车
        // await page.keyboard.press("Enter");
        await page.click('#addButton', {delay: 50});
        // 断言，看实际的结果和我预估的结果是否相同，如果相同，则通过测试
        let todoList = await page.waitFor('#myUL');
        const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
        expect(expectInputContent).to.eql(newTaskContent);
    })
});








describe('update task', function () {
    let page;

    before (async function () {
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:80/');
    });

    after (async function () {
        await page.close();
    });











    it('should update task', async function() {
        const updatedContent = 'updated content';
        await page.waitFor('.task-input');

        await page.click('.task-items .task-item:last-child .edit-button');
        const textareaElement=await page.$('.task-item:last-child textarea');
        await textareaElement.click( {clickCount: 3})
        await textareaElement.type(updatedContent);
        await page.$eval('.task-item:last-child textarea', textarea => textarea.blur());

        let theLastItem = await page.waitFor('.task-items .task-item:last-child');
        const expectInputContent = await page.evaluate(task => task.querySelector('textarea').textContent, theLastItem);
        expect(expectInputContent).to.eql(updatedContent);
    });
});

describe('delete task', function () {
    let page;

    before (async function () {
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:80/');
    });

    after (async function () {
        await page.close();
    });


    it('should delete the new task in the end of the list', async function() {
        await page.waitFor('.task-input');
        let originalItemsCount = await page.$$('.task-item').then(item => item.length);

        await page.click('.task-items .task-item:last-child .delete-button');
        await page.waitFor(500);

        let itemsCount = await page.$$('.task-item').then(item => item.length);
        expect(originalItemsCount - itemsCount).to.eql(1);
    });








    it('change todo list correct', async function() {
        await page.click("li[class='not-done']", {delay: 500});

        const number = await page.evaluate(() => {
            return document.getElementsByTagName('li[class=\'not-done\']').length;
        });
        expect(number).to.eql(0);
    })

});