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
        const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('#myUL #myUL:li').textContent, todoList);
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
        await page.waitFor('#myUL');
        await page.click('#myUL #myUL:li:last-child');
        const textareaElement=await page.$('.updatetask');
        await textareaElement.click('#submitchange')
        await page.$eval('#myUL #myUL:li:last-child textarea', textarea => textarea.blur());
        let theLastItem = await page.waitFor('#myUL #myUL:li:last-child');
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
        await page.waitFor('#myUL');
        let originalItemsCount = await page.$$('#myUL #myUL:li').then(item => item.length);
        await page.click('#myUL #myUL:li:last-child .close');
        await page.waitFor(500);
        let itemsCount = await page.$$('#myUL #myUL:li').then(item => item.length);
        expect(originalItemsCount - itemsCount).to.eql(1);
    });
});