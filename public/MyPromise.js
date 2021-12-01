class MyPromise {
    /*ES6 class语法
    * 1.类中的属性和方法都是定义在原型对象上的，例如initBind/initValue/resolve/reject
    * 2.实例的属性和方法在constructor函数中通过this.name="zhangsan"这种形式指定
    * 3.new className()会调用constructor函数，
    *   +在constructor执行前先创建一个空对象赋给this，constructor执行完默认返回this对象
    *     +当然也可以通过return显示指定要返回的对象
    * */
    // 构造方法
    constructor(executor) {
        this.initValue();
        this.initBind();// 初始化this指向
        // 执行传进来的函数
        try {
            executor(this.resolve, this.reject);
        }catch (e){
            this.reject(e);
        }
    }
    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    initValue() {
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
        this.onFullfilledCallbacks = [] // 保存成功回调
        this.onRejectedCallbacks = [] // 保存失败回调
    }
    resolve(value) {
        if(this.PromiseState !== 'pending') return;
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value
        while (this.onFullfilledCallbacks.length) {
            this.onFullfilledCallbacks.shift()(this.PromiseResult)
        }
    }
    reject(reason) {
        if(this.PromiseState !== 'pending') return;
        this.PromiseState = 'rejected';
        this.PromiseResult = reason;
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.PromiseResult)
        }
    }
    then(onFullfilled, onRejected){// 参数校验，确保一定是函数
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        var thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = cb => {
                try {
                    const x = cb(this.PromiseResult)
                    if (x === thenPromise) {// 不能返回自身哦
                        throw new Error('不能返回自身...')
                    }else if (x instanceof MyPromise) {
                        // 如果返回值是promise对象: 返回值为成功，新promise就是成功;返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else { // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    reject(err)
                }
            }

            if (this.PromiseState === 'fulfilled') {
                resolvePromise(onFullfilled) // onFullfilled(this.PromiseResult)
            } else if (this.PromiseState === 'rejected') {
                resolvePromise(onRejected)  // onRejected(this.PromiseResult)
            } else if (this.PromiseState === 'pending') {
                // this.onFullfilledCallbacks.push(onFullfilled.bind(this))
                this.onFullfilledCallbacks.push(resolvePromise.bind(this, onFullfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })

        return thenPromise;
    }
}