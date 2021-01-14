<template>
  <router-view />
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
#app {
  height: 100%;
  width: 100%;
  font-size: 14px;
}

/* CSS Document */
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
  font-size: 14px;
}
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
object,
code,
em,
span,
var,
legend,
button,
input,
textarea,
th,
td,
a,
img,
header,
footer,
nav,
aside,
audio,
datalist,
section {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}

/*清除内外边距*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: 100%;
}

/*设置默认字体*/
:focus {
  outline: 0;
}

ul,
ol,
ul li,
ol li {
  list-style: none;
}

/*重置列表*/
address,
caption,
cite,
em,
code,
dfn,
th,
var {
  font-style: normal;
  font-weight: normal;
}

form label {
  cursor: pointer;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  outline: none;
}

textarea {
  resize: none;
}

input {
  vertical-align: middle;
}

img {
  border: 0;
}

/*重置图片元素*/
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*重置表格*/
.l {
  float: left;
}

.r {
  float: right;
}

button,
input[type="reset"],
input[type="button"],
input[type="submit"] {
  line-height: normal !important;
}

a {
  text-decoration: none;
}

a {
  color: #666;
}

input::-webkit-input-placeholder {
  color: red;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

/*--清除浮动
------------------------------------------------------------------------------------------*/
.clearfix:after {
  clear: both;
  content: ".";
  display: block;
  font-size: 0;
  height: 0;
  visibility: hidden;
}

.clearfix:after {
  _zoom: 1;
}

.overflow {
  overflow: hidden;
  _zoom: 1;
}

.clear {
  clear: both;
  height: 0;
  font-size: 0;
  overflow: hidden;
}
</style>
