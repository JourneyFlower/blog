import{g as n,j as s,l as a,f as t,q as o}from"./common-bec3f312.js";const e='{"title":"纪年 |【第一期】launch-editor 源码解读记录","frontmatter":{"date":"2021-08-11","title":"纪年 |【第一期】launch-editor 源码解读记录","tags":["源码","vue3"],"describe":"launch-editor 源码解读记录"},"headers":[{"level":2,"title":"1. 解读前的准备","slug":"_1-解读前的准备"},{"level":2,"title":"2. 开始学习，浅尝辄止","slug":"_2-开始学习，浅尝辄止"},{"level":3,"title":"2.1 开始动手","slug":"_2-1-开始动手"},{"level":3,"title":"2.2 调试之旅","slug":"_2-2-调试之旅"},{"level":2,"title":"3. 动手操作，深入实践","slug":"_3-动手操作，深入实践"},{"level":3,"title":"3.1 编辑器如何接收到浏览器的请求信息","slug":"_3-1-编辑器如何接收到浏览器的请求信息"},{"level":3,"title":"3.2 用到了哪些 API/编程技巧","slug":"_3-2-用到了哪些-api-编程技巧"},{"level":3,"title":"3.3 如何实现（复述思路）","slug":"_3-3-如何实现（复述思路）"},{"level":2,"title":"4. 感想","slug":"_4-感想"}],"relativePath":"docs/launch-editor.md","lastUpdated":1739959579198.5388}';var l={};const c=s("blockquote",null,[s("p",null,[a("【若川】launch-editor 源码解读："),s("a",{href:"https://juejin.cn/post/6959348263547830280",target:"_blank",rel:"noopener noreferrer"},"https://juejin.cn/post/6959348263547830280")])],-1),p=s("h2",{id:"_1-解读前的准备"},[s("a",{class:"header-anchor",href:"#_1-解读前的准备","aria-hidden":"true"},"#"),a(" 1. 解读前的准备")],-1),u=s("p",null,"1.1 粗略阅读一遍川哥的源码解读文章，弄清楚文章的主旨内容：探究 vue-devtools「在编辑器中打开组件」功能实现原理**，它的核心实现就是 launch-editor**。",-1),r=s("p",null,"1.2 明确自己到底要学习什么：",-1),i=s("p",null,"​ 1）学习调试源码的方法；",-1),k=s("p",null,"​ 2）在调试过程中探究 launch-editor 源码是如何实现在编辑器打开对应的文件；",-1),d=s("p",null,"​ 目标：跟着川哥的文章完整走完一遍调试的流程，并对外输出记录文档。",-1),h=s("p",null,"1.3 资源：",-1),g=s("ul",null,[s("li",null,[s("p",null,[a("下载川哥的源码："),s("code",null,"git clone https://github.com/lxchuan12/open-in-editor.git"),a("，进入 vue3-project 目录，安装依赖"),s("code",null,"yarn install")])]),s("li",null,[s("p",null,"安装 vue-devtools 谷歌扩展：翻墙去应用商店下载安装即可（下载 6.0.0 beta 版）")]),s("li",null,[s("p",null,[a("了解 "),s("a",{href:"https://github.com/yyx990803/launch-editor",target:"_blank",rel:"noopener noreferrer"},"launch-editor"),a("：主要功能是在编辑器中打开带有行号的文件")])])],-1),f=s("h2",{id:"_2-开始学习，浅尝辄止"},[s("a",{class:"header-anchor",href:"#_2-开始学习，浅尝辄止","aria-hidden":"true"},"#"),a(" 2. 开始学习，浅尝辄止")],-1),m=s("p",null,"上述的准备工作搞完之后，我们动手操作一下。",-1),_=s("h3",{id:"_2-1-开始动手"},[s("a",{class:"header-anchor",href:"#_2-1-开始动手","aria-hidden":"true"},"#"),a(" 2.1 开始动手")],-1),v=s("p",null,"我使用的编辑器是 VSCode。",-1),b=s("p",null,[a("打开 vue3-project 目录的 package.json，点击调试，选择 serve。这一步操作，使得我们以 debug 的形式，运行了 "),s("strong",null,"vue-cli-service serve"),a(" 这个命令。")],-1),w=s("p",null,[s("img",{src:"/blog/_assets/launch-editor0.897d479b.png",alt:""})],-1),y=s("p",null,"跟着文章实现到这里的时候，我有点懵逼，因为我不知道接下来为什么突然要搜索【launch-editor-middleware】这个库。",-1),j=s("p",null,[a("直到我再次通读一遍文章，发现川哥前面有提到 vue-devtools 的 "),s("a",{href:"https://github.com/vuejs/devtools/blob/legacy/docs/open-in-editor.md",target:"_blank",rel:"noopener noreferrer"},"Open component in editor"),a(" 这个文档，这个文档里面描述了引用了【launch-editor-middleware】这个库来实现打开文档的功能。而我之前先入为主地以为，这期是解读 vue-devtools 的源码，其实这只是解读实现打开文档功能的源码而已。")],-1),E=s("p",null,"理解了这一层，我们可以直接搜项目里（包括 node_modules）里的【launch-editor-middleware】关键字，就可以找到这个库的源码位置了。",-1),x=s("h3",{id:"_2-2-调试之旅"},[s("a",{class:"header-anchor",href:"#_2-2-调试之旅","aria-hidden":"true"},"#"),a(" 2.2 调试之旅")],-1),N=s("p",null,[s("strong",null,"调试的流程就是打断点，点击调试的流程面板，经过不断调试，观察数据的变化。")],-1),C=s("p",null,[a("下图【launch-editor-middleware】的源码，在这份源码中我们能很轻易地分析出，最终运行的是 launch 函数，我们可以这这里打一个断点，然后进入到【launch-editor】的源码，实际运行的是 "),s("strong",null,"launchEditor"),a(" 函数。")],-1),A=s("p",null,[s("img",{src:"/blog/_assets/launch-editor1.2a18be31.png",alt:""}),s("img",{src:"/blog/_assets/launch-editor2.4d56eb8a.png",alt:""})],-1),P=s("p",null,"粗略看一遍 launchEditor 函数，发现它实际上是做了四件事：",-1),M=s("ul",null,[s("li",null,[s("p",null,"获取 fileName，lineNumber，columnNumber")]),s("li",null,[s("p",null,"异常处理：是否存在文件，onErrorCallback，是否存在 editor")]),s("li",null,[s("p",null,"猜测当前正在使用的编辑器：guessEditor")]),s("li",null,[s("p",null,"使用 child_process.spwan 异步打开一个子进程模块，它调起了 cmd.exe 工具打开我们的编辑器，并打开了文件（args 就是文件的参数）")])],-1),R=s("p",null,"看完了这个函数，其实大概实现的原理也就出来了，核心代码如下：",-1),q=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),a("process"),s("span",{class:"token punctuation"},"."),a("platform "),s("span",{class:"token operator"},"==="),a(),s("span",{class:"token string"},"'win32'"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n  _childProcess "),s("span",{class:"token operator"},"="),a(" childProcess"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"spawn"),s("span",{class:"token punctuation"},"("),a("\n    "),s("span",{class:"token string"},"'cmd.exe'"),s("span",{class:"token punctuation"},","),a("\n    "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},"'/C'"),s("span",{class:"token punctuation"},","),a(" editor"),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"concat"),s("span",{class:"token punctuation"},"("),a("args"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},","),a("\n    "),s("span",{class:"token punctuation"},"{"),a(" stdio"),s("span",{class:"token operator"},":"),a(),s("span",{class:"token string"},"'inherit'"),a(),s("span",{class:"token punctuation"},"}"),a("\n  "),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token punctuation"},"}"),a(),s("span",{class:"token keyword"},"else"),a(),s("span",{class:"token punctuation"},"{"),a("\n  _childProcess "),s("span",{class:"token operator"},"="),a(" childProcess"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"spawn"),s("span",{class:"token punctuation"},"("),a("editor"),s("span",{class:"token punctuation"},","),a(" args"),s("span",{class:"token punctuation"},","),a(),s("span",{class:"token punctuation"},"{"),a(" stdio"),s("span",{class:"token operator"},":"),a(),s("span",{class:"token string"},"'inherit'"),a(),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n")])])],-1),H=s("p",null,"但我们肯定还有很多疑惑，比如：",-1),I=s("ul",null,[s("li",null,[s("p",null,"在浏览器控制台点击按钮，编辑器是怎么接收到它的请求信息呢？")]),s("li",null,[s("p",null,"用到了哪些 API/编程技巧？")]),s("li",null,[s("p",null,"这个功能实现如果让我们来实现，是怎么实现呢（复述思路）？")])],-1),W=s("h2",{id:"_3-动手操作，深入实践"},[s("a",{class:"header-anchor",href:"#_3-动手操作，深入实践","aria-hidden":"true"},"#"),a(" 3. 动手操作，深入实践")],-1),T=s("p",null,"在前面的拆解中，虽然很多地方看似看懂了，但又没完全懂，那我们来解答一下在看源码的时候的疑问：",-1),V=s("h3",{id:"_3-1-编辑器如何接收到浏览器的请求信息"},[s("a",{class:"header-anchor",href:"#_3-1-编辑器如何接收到浏览器的请求信息","aria-hidden":"true"},"#"),a(" 3.1 编辑器如何接收到浏览器的请求信息")],-1),F=s("p",null,[a("点击 vue-devtools 的按钮时，我们会发现它发送了一个请求："),s("a",{href:"http://localhost:8080/__open-in-editor?file=src/components/HelloWorld.vue",target:"_blank",rel:"noopener noreferrer"},"http://localhost:8080/__open-in-editor?file=src/components/HelloWorld.vue")],-1),L=s("p",null,[s("img",{src:"/blog/_assets/launch-editor3.7d39b9bc.png",alt:""})],-1),O=s("p",null,[a("那编辑器是如何接收到这个请求呢？搜索【launch-editor-middleware】关键字，我们会发现，在 @vue/cli-service 的 serve.js 文件中，使用了 "),s("strong",null,'app.use("/__open-in-editor")'),a("，用过 express 的小伙伴会比较熟悉，这是express 引入中间件的用法。当浏览器发送 "),s("a",{href:"http://localhost:8080/__open-in-editor?file=src/components/HelloWorld.vue",target:"_blank",rel:"noopener noreferrer"},"http://localhost:8080/__open-in-editor?file=src/components/HelloWorld.vue"),a(" 这个请求的时候，就进入到下面这个代码了。")],-1),S=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token comment"},"// vue3-project/node_modules/@vue/cli-service/lib/commands/serve.js"),a("\n"),s("span",{class:"token comment"},"// 46行"),a("\n"),s("span",{class:"token keyword"},"const"),a(" launchEditorMiddleware "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"require"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'launch-editor-middleware'"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token comment"},"// 192行"),a("\n"),s("span",{class:"token function"},"before"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},[a("app"),s("span",{class:"token punctuation"},","),a(" server")]),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n    "),s("span",{class:"token comment"},"// launch editor support."),a("\n    "),s("span",{class:"token comment"},"// this works with vue-devtools & @vue/cli-overlay"),a("\n    app"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"use"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'/__open-in-editor'"),s("span",{class:"token punctuation"},","),a(),s("span",{class:"token function"},"launchEditorMiddleware"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token operator"},"=>"),a(" console"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"log"),s("span",{class:"token punctuation"},"("),a("\n        "),s("span",{class:"token template-string"},[s("span",{class:"token template-punctuation string"},"`"),s("span",{class:"token string"},"To specify an editor, specify the EDITOR env variable or "),s("span",{class:"token template-punctuation string"},"`")]),a(),s("span",{class:"token operator"},"+"),a("\n        "),s("span",{class:"token template-string"},[s("span",{class:"token template-punctuation string"},"`"),s("span",{class:"token string"},'add "editor" field to your Vue project config.\\n'),s("span",{class:"token template-punctuation string"},"`")]),a("\n    "),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},")"),a("\n    "),s("span",{class:"token comment"},"// 省略若干代码..."),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n")])])],-1),D=s("h3",{id:"_3-2-用到了哪些-api-编程技巧"},[s("a",{class:"header-anchor",href:"#_3-2-用到了哪些-api-编程技巧","aria-hidden":"true"},"#"),a(" 3.2 用到了哪些 API/编程技巧")],-1),U=s("h4",{id:"_3-2-1-函数的重载"},[s("a",{class:"header-anchor",href:"#_3-2-1-函数的重载","aria-hidden":"true"},"#"),a(" 3.2.1 函数的重载")],-1),z=s("p",null,"在【launch-editor-middleware】的入口函数这里，使用了函数重载的写法，这种写法在很多源码中都很常见，目的是方便用户调用时传参，针对不定量的参数对应不同的操作内容。",-1),B=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token comment"},"// vue3-project/node_modules/launch-editor-middleware/index.js"),a("\n"),s("span",{class:"token keyword"},"const"),a(" url "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"require"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'url'"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token keyword"},"const"),a(" path "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"require"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'path'"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token keyword"},"const"),a(" launch "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"require"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'launch-editor'"),s("span",{class:"token punctuation"},")"),a("\n\nmodule"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function-variable function"},"exports"),a(),s("span",{class:"token operator"},"="),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},[a("specifiedEditor"),s("span",{class:"token punctuation"},","),a(" srcRoot"),s("span",{class:"token punctuation"},","),a(" onErrorCallback")]),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token operator"},"=>"),a(),s("span",{class:"token punctuation"},"{"),a("\n  "),s("span",{class:"token comment"},"// specifiedEditor => 这里传递过来的则是 () => console.log() 函数"),a("\n  "),s("span",{class:"token comment"},"// 所以和 onErrorCallback 切换下，把它赋值给错误回调函数"),a("\n  "),s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token keyword"},"typeof"),a(" specifiedEditor "),s("span",{class:"token operator"},"==="),a(),s("span",{class:"token string"},"'function'"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n    onErrorCallback "),s("span",{class:"token operator"},"="),a(" specifiedEditor\n    specifiedEditor "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token keyword"},"undefined"),a("\n  "),s("span",{class:"token punctuation"},"}"),a("\n\n  "),s("span",{class:"token comment"},"// 如果第二个参数是函数，同样把它赋值给错误回调函数"),a("\n  "),s("span",{class:"token comment"},"// 这里传递过来的是undefined"),a("\n  "),s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token keyword"},"typeof"),a(" srcRoot "),s("span",{class:"token operator"},"==="),a(),s("span",{class:"token string"},"'function'"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n    onErrorCallback "),s("span",{class:"token operator"},"="),a(" srcRoot\n    srcRoot "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token keyword"},"undefined"),a("\n  "),s("span",{class:"token punctuation"},"}"),a("\n\n  "),s("span",{class:"token comment"},"// srcRoot 是传递过来的参数，或者当前 node 进程的目录"),a("\n  srcRoot "),s("span",{class:"token operator"},"="),a(" srcRoot "),s("span",{class:"token operator"},"||"),a(" process"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"cwd"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},")"),a("\n\n  "),s("span",{class:"token comment"},"// 最后返回一个函数， express 中间件"),a("\n  "),s("span",{class:"token keyword"},"return"),a(),s("span",{class:"token keyword"},"function"),a(),s("span",{class:"token function"},"launchEditorMiddleware"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},[a("req"),s("span",{class:"token punctuation"},","),a(" res"),s("span",{class:"token punctuation"},","),a(" next")]),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n    "),s("span",{class:"token comment"},"// 省略 ..."),a("\n  "),s("span",{class:"token punctuation"},"}"),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n")])])],-1),G=s("h4",{id:"_3-2-2-装饰器模式"},[s("a",{class:"header-anchor",href:"#_3-2-2-装饰器模式","aria-hidden":"true"},"#"),a(" 3.2.2 装饰器模式")],-1),J=s("p",null,"这段代码 wrapErrorCallback 先执行其他代码，再去执行 onErrorCallback，这种包裹函数的形式在很多源码里都也很常见，可以理解为一个装饰器，把 onErrorCallback 包装了起来，对原函数进行了增强。",-1),K=s("p",null,"这也是设计模式中的装饰器设计模式：",-1),Q=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token keyword"},"function"),a(),s("span",{class:"token function"},"wrapErrorCallback"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},"cb"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n  "),s("span",{class:"token keyword"},"return"),a(),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},[a("fileName"),s("span",{class:"token punctuation"},","),a(" errorMessage")]),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token operator"},"=>"),a(),s("span",{class:"token punctuation"},"{"),a("\n    console"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"log"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},")"),a("\n    console"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"log"),s("span",{class:"token punctuation"},"("),a("\n      chalk"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"red"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'Could not open '"),a(),s("span",{class:"token operator"},"+"),a(" path"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"basename"),s("span",{class:"token punctuation"},"("),a("fileName"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token operator"},"+"),a(),s("span",{class:"token string"},"' in the editor.'"),s("span",{class:"token punctuation"},")"),a("\n    "),s("span",{class:"token punctuation"},")"),a("\n    "),s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),a("errorMessage"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n      "),s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),a("errorMessage"),s("span",{class:"token punctuation"},"["),a("errorMessage"),s("span",{class:"token punctuation"},"."),a("length "),s("span",{class:"token operator"},"-"),a(),s("span",{class:"token number"},"1"),s("span",{class:"token punctuation"},"]"),a(),s("span",{class:"token operator"},"!=="),a(),s("span",{class:"token string"},"'.'"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n        errorMessage "),s("span",{class:"token operator"},"+="),a(),s("span",{class:"token string"},"'.'"),a("\n      "),s("span",{class:"token punctuation"},"}"),a("\n      console"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"log"),s("span",{class:"token punctuation"},"("),a("\n        chalk"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"red"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},"'The editor process exited with an error: '"),a(),s("span",{class:"token operator"},"+"),a(" errorMessage"),s("span",{class:"token punctuation"},")"),a("\n      "),s("span",{class:"token punctuation"},")"),a("\n    "),s("span",{class:"token punctuation"},"}"),a("\n    console"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"log"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},")"),a("\n    "),s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),a("cb"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token function"},"cb"),s("span",{class:"token punctuation"},"("),a("fileName"),s("span",{class:"token punctuation"},","),a(" errorMessage"),s("span",{class:"token punctuation"},")"),a("\n  "),s("span",{class:"token punctuation"},"}"),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n\nonErrorCallback "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"wrapErrorCallback"),s("span",{class:"token punctuation"},"("),a("onErrorCallback"),s("span",{class:"token punctuation"},")"),a("\n")])])],-1),X=s("h4",{id:"_3-2-3-apply"},[s("a",{class:"header-anchor",href:"#_3-2-3-apply","aria-hidden":"true"},"#"),a(" 3.2.3 apply")],-1),Y=s("p",null,[a("apply 语法："),s("em",null,"func.apply(thisArg, [argsArray])"),a("，也经常在源码中可以看到。这里使用 apply 是把 extraArgs 作为 push 方法的 arguments 传进去。")],-1),Z=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token keyword"},"if"),a(),s("span",{class:"token punctuation"},"("),a("lineNumber"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n  "),s("span",{class:"token comment"},"// getArgumentsForPosition 返回一个数组"),a("\n  "),s("span",{class:"token keyword"},"const"),a(" extraArgs "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"getArgumentsForPosition"),s("span",{class:"token punctuation"},"("),a("editor"),s("span",{class:"token punctuation"},","),a(" fileName"),s("span",{class:"token punctuation"},","),a(" lineNumber"),s("span",{class:"token punctuation"},","),a(" columnNumber"),s("span",{class:"token punctuation"},")"),a("\n  "),s("span",{class:"token comment"},"// 将 extraArgs 参数 push 到 args 里"),a("\n  args"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"push"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"apply"),s("span",{class:"token punctuation"},"("),a("args"),s("span",{class:"token punctuation"},","),a(" extraArgs"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token punctuation"},"}"),a(),s("span",{class:"token keyword"},"else"),a(),s("span",{class:"token punctuation"},"{"),a("\n  args"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"push"),s("span",{class:"token punctuation"},"("),a("fileName"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n")])])],-1),$=s("h4",{id:"_3-2-4-cild-process"},[s("a",{class:"header-anchor",href:"#_3-2-4-cild-process","aria-hidden":"true"},"#"),a(" 3.2.4 cild_process")],-1),nn=s("p",null,"child_process 是 Node.js 的一个模块，它提供了衍生子进程的能力，默认情况下，会在父 Node.js 进程和衍生的子进程之间建立 stdin、stdout 和 stderr 的管道。",-1),sn=s("h4",{id:"_3-2-5-process-platform"},[s("a",{class:"header-anchor",href:"#_3-2-5-process-platform","aria-hidden":"true"},"#"),a(" 3.2.5 process.platform")],-1),an=s("p",null,'用于标识运行 Node.js 进程的操作系统平台，返回字符串，目前可能的值有： "aix" | "darwin" | "freebsd" | "linux" | "openbsd" | "sunos" | "win32"',-1),tn=s("h3",{id:"_3-3-如何实现（复述思路）"},[s("a",{class:"header-anchor",href:"#_3-3-如何实现（复述思路）","aria-hidden":"true"},"#"),a(" 3.3 如何实现（复述思路）")],-1),on=s("ul",null,[s("li",null,[s("p",null,"浏览器与编辑器的通讯：借助 Node.js 进程，与浏览器发生通讯")]),s("li",null,[s("p",null,"浏览器将需要打开的文件路径通过参数传递给编辑器")]),s("li",null,[s("p",null,"判断操作系统平台和所使用的编辑器（每个平台的命令行程序不一样，每个编辑器的环境变量也不一样）")]),s("li",null,[s("p",null,"借助 Node 调起 cmd.exe 工具打开我们的编辑器，打开对应路径的文件")])],-1),en=s("div",{class:"language-javascript"},[s("pre",null,[s("code",null,[s("span",{class:"token comment"},"// 伪代码"),a("\napp"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"use"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string"},'"__open-in-editor"'),s("span",{class:"token punctuation"},","),a(" handleLaunchEditor"),s("span",{class:"token punctuation"},")"),a("\n\n"),s("span",{class:"token keyword"},"function"),a(),s("span",{class:"token function"},"handleLaunchEditor"),s("span",{class:"token punctuation"},"("),s("span",{class:"token parameter"},"filePath"),s("span",{class:"token punctuation"},")"),a(),s("span",{class:"token punctuation"},"{"),a("\n  "),s("span",{class:"token keyword"},"const"),a(" platform "),s("span",{class:"token operator"},"="),a(" process"),s("span",{class:"token punctuation"},"."),a("platform\n  "),s("span",{class:"token keyword"},"const"),a(" editor "),s("span",{class:"token operator"},"="),a(),s("span",{class:"token function"},"guessEditor"),s("span",{class:"token punctuation"},"("),s("span",{class:"token punctuation"},")"),a("\n  childProcess"),s("span",{class:"token punctuation"},"."),s("span",{class:"token function"},"spawn"),s("span",{class:"token punctuation"},"("),a("editor"),s("span",{class:"token punctuation"},","),a(" fileArgs"),s("span",{class:"token punctuation"},","),a(),s("span",{class:"token punctuation"},"{"),a(" stdio"),s("span",{class:"token operator"},":"),a(),s("span",{class:"token string"},"'inherit'"),a(),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},")"),a("\n"),s("span",{class:"token punctuation"},"}"),a("\n")])])],-1),ln=s("h2",{id:"_4-感想"},[s("a",{class:"header-anchor",href:"#_4-感想","aria-hidden":"true"},"#"),a(" 4. 感想")],-1),cn=s("ul",null,[s("li",null,[s("p",null,"编码能力：通过解读 launch-editor 源码，学习/重温了【函数的重载】【装饰器模式】【apply 使用方法】，源码的组织结构也非常值得我们学习，比如里面很多功能代码都单独封装起来，封装成函数或者模块，使得整个源码的结构非常清晰，核心通俗易懂，易于解读和维护。（这也可以理解为自顶向下的编程方法）")]),s("li",null,[s("p",null,"拓展视野：源码中包含了很多与 Node.js 相关的方法，有很多都是我不熟悉的，在解读源码的过程也是我学习 Node.js 的过程。")]),s("li",null,[s("p",null,"工作中可能会用到：")]),s("li",null,[s("ul",null,[s("li",null,"开发 VSCode 插件与外界通讯可借助 Node.js 进程"),s("li",null,"装饰器模式的应用")])]),s("li",null,[s("ul",null,[s("li",null,"判断操作系统平台")])])],-1);l.render=function(a,e,l,pn,un,rn){const kn=o("Comment");return t(),n("div",null,[c,p,u,r,i,k,d,h,g,f,m,_,v,b,w,y,j,E,x,N,C,A,P,M,R,q,H,I,W,T,V,F,L,O,S,D,U,z,B,G,J,K,Q,X,Y,Z,$,nn,sn,an,tn,on,en,ln,cn,s(kn)])};export default l;export{e as __pageData};
