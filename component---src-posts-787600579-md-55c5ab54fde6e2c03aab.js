(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{m86r:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return m})),t.d(n,"default",(function(){return d}));var a=t("zLVn"),c=(t("q1tI"),t("7ljp")),m={title:"CSS 模拟打字动画",slug:"CSS模拟打字动画",date:"2021-01-17T10:41:16.000Z",tags:["标签"],categories:["未分类"],keywords:["关键册"]},p={_frontmatter:m};function d(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(c.mdx)("wrapper",Object.assign({},p,t,{components:n,mdxType:"MDXLayout"}),Object(c.mdx)("h2",null,"前言"),Object(c.mdx)("p",null,"或许你看过网上的一些模拟打字的效果，深究其原理，会发现很简单，核心原理就是逐帧动画、闪烁效果。"),Object(c.mdx)("p",null,"或许你会想到使用 JavaScript 来实现，固然，这是一个办法，但是这会产生一段又臭又长、难以理解的代码。"),Object(c.mdx)("p",null,"这里，我们可以使用纯 CSS 来实现。"),Object(c.mdx)("h2",null,"解决方案"),Object(c.mdx)("blockquote",null,Object(c.mdx)("p",{parentName:"blockquote"},"核心思路将一段文案放置到可拉伸的容器中。")),Object(c.mdx)("pre",null,Object(c.mdx)("code",Object.assign({parentName:"pre"},{className:"language-html"}),"<h1>这是一段模拟的打字效果。</h1>\n")),Object(c.mdx)("pre",null,Object(c.mdx)("code",Object.assign({parentName:"pre"},{className:"language-css"}),"@keyframes typing {\n    from { width: 0 }\n}\n\nh1 {\n    width: 22em;\n    overflow: hidden;\n    white-space: nowrap;\n    animation: typing 4s;\n}\n")),Object(c.mdx)("h3",null,"逐字效果"),Object(c.mdx)("p",null,"前面代码并不是逐字显示的，为了解决这一问题，我们可是使用 ",Object(c.mdx)("inlineCode",{parentName:"p"},"steps()")," 来解决："),Object(c.mdx)("pre",null,Object(c.mdx)("code",Object.assign({parentName:"pre"},{className:"language-css"}),"h1 {\n    width: 22em;\n    overflow: hidden;\n    white-space: nowrap;\n    animation: typing 4s steps(22);\n}\n")),Object(c.mdx)("h3",null,"光标闪烁效果"),Object(c.mdx)("p",null,"是不是觉得还差一些，对，就是差一个光标输入闪烁效果。这里，我们可以使用为元素来生成一个光标，并通过 ",Object(c.mdx)("inlineCode",{parentName:"p"},"opacity")," 属性来实现闪烁效果。"),Object(c.mdx)("p",null,"当然，也可以用右边框来模拟光标效果，这样就可以把有限的伪元素资源节省下来留作他用。"),Object(c.mdx)("pre",null,Object(c.mdx)("code",Object.assign({parentName:"pre"},{className:"language-css"}),"@keyframes typing {\n    from { width: 0 }\n}\n@keyframes caret {\n    50% { border-color: transparent; }\n}\nh1 {\n    width: 12em;\n    overflow: hidden;\n    white-space: nowrap;\n    border-right: .05em solid;\n    animation: typing 5s steps(12), caret .5s steps(1) infinite;\n}\n")),Object(c.mdx)("h2",null,"总结"),Object(c.mdx)("p",null,"寥寥数行 CSS 代码，便可以实现一段模拟打字的效果，其核心就是借助 ",Object(c.mdx)("inlineCode",{parentName:"p"},"em")," 单位及 ",Object(c.mdx)("inlineCode",{parentName:"p"},"steps()")," 属性 实现逐帧动画，并利用 ",Object(c.mdx)("inlineCode",{parentName:"p"},"infinite")," 属性创建一个不断循环闪烁的光标。"),Object(c.mdx)("p",null,"另外，这里我们使用的是 ",Object(c.mdx)("inlineCode",{parentName:"p"},"em")," 单位，设置 ",Object(c.mdx)("inlineCode",{parentName:"p"},"h1")," 宽度为 ",Object(c.mdx)("inlineCode",{parentName:"p"},"12em"),"，12 这个数字是根据 ",Object(c.mdx)("inlineCode",{parentName:"p"},"h1")," 标签内的字符串长度得来的。"),Object(c.mdx)("p",null,"不过，如果不是中文，建议使用 ",Object(c.mdx)("inlineCode",{parentName:"p"},"ch")," 单位来设置 ",Object(c.mdx)("inlineCode",{parentName:"p"},"width"),"。"),Object(c.mdx)("p",null,"对于一段文字夹杂了中文、英文等其他字符，会发生一些预期之外的现象，所以，该解决方案也有一定的局限性。"))}d.isMDXComponent=!0},zLVn:function(e,n,t){"use strict";function a(e,n){if(null==e)return{};var t,a,c={},m=Object.keys(e);for(a=0;a<m.length;a++)t=m[a],n.indexOf(t)>=0||(c[t]=e[t]);return c}t.d(n,"a",(function(){return a}))}}]);
//# sourceMappingURL=component---src-posts-787600579-md-55c5ab54fde6e2c03aab.js.map