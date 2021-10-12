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

function sliderTrans(index, transAttrs = 'none') {
    let transX = -index * focusWidth;
    // 移动端采用CSS3的过渡动画即可
    slider.style.transition = transAttrs;
    // 注意括号和单位
    slider.style.transform = 'translateX(' + transX + 'px)';
}

// 等到过渡完成之后，再监听事件
slider.addEventListener('transitionend', function () {
    // 实现无缝滚动
    // 因为初始位置已经往左挪了一张图片的宽度，所以要多减1
    if (index >= slider.children.length - 2) {
        index = 0;
        sliderTrans(index);
    } else if (index < 0) {
        index = slider.children.length - 3;
        sliderTrans(index, 'none');
    }
    // 小圆点跟随变化
    // 选出当前选中的小圆点，移除类名
    indicator.querySelector('.selected').classList.remove('selected');
    // 选出和索引号相同的小圆点
    indicator.children[index].classList.add('selected');
});

// 手指触摸滑动图片
let startX = 0;
let moveX = 0;
slider.addEventListener('touchstart', function (e) {
    // 获取手指触摸屏幕时的X坐标
    startX = e.targetTouches[0].pageX;
    // 触摸时停止计时器
    clearInterval(timer);
    timer = null;
});

slider.addEventListener('touchmove', function (e) {
    // 现在的坐标减初始坐标就是图片应该移动的距离
    moveX = e.targetTouches[0].pageX - startX;
    let transX = -index * focusWidth + moveX;
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(' + transX + 'px)';
    // 阻止默认事件执行（屏幕滚动）
    e.preventDefault();
});

//根据手指滑动距离决定是否切换图片
slider.addEventListener('touchend', function (e) {
    // 如果移动距离大于50像素就播放上一张或者下一张;
    if (Math.abs(moveX) > 100) {
        // 右滑则播放上一张，左滑播放下一张
        moveX > 0 ? index-- : index++;
        sliderTrans(index, 'all .5s ease-in-out');
    } else {
        sliderTrans(index, 'all .2s ease-out');
    }
    // 手指离开时重新开启定时器
    clearInterval(timer);
    // 注意这里不能写let
    timer = setInterval(function () {
        index++;
        sliderTrans(index, 'all .5s ease-in-out');
    }, 2000);
});