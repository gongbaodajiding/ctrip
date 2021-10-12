let focus = document.querySelector('.focus');
let slider = document.querySelector('.slider');
let indicator = document.querySelector('.indicator');
let focusWidth = focus.offsetWidth;

// 根据图片数量动态生成指示小圆圈
for (let i = 0; i < slider.children.length; i++) {
    let li = document.createElement('li');
    indicator.appendChild(li);
}
indicator.children[0].className = 'selected';

// 克隆第一张图片放在最后，实现无缝滚动
// 此处代码不能放在前面，否则小圆圈会多一个
let first = slider.children[0].cloneNode(true);// 此处为深克隆，连同子节点一起克隆
slider.appendChild(first);// append自动添加到末尾
// 因为移动端用户可能开始就进行左滑，所以要克隆最后一张图片放到最前，才能实现无缝滚动
let end = slider.children[slider.children.length - 2].cloneNode(true);
slider.insertBefore(end, slider.children[0]);

// 自动滚动效果
let index = 0;
let timer = setInterval(function () {
    index++;
    sliderTrans(index, 'all .5s ease-in-out');
}, 2000);

function sliderTrans(index, transAttrs) {
    let transX = -index * focusWidth;
    // 移动端采用CSS3的过渡动画即可
    slider.style.transition = transAttrs;
    // 注意括号和单位
    slider.style.transform = 'translateX(' + transX + 'px)';
}

// 等到过渡完成之后，再监听事件
slider.addEventListener('transitionend', function () {
    
});