function $(select) {
  const selection = document.querySelectorAll(select);
  if (!selection.length) return null;

  return $.Query.init([...selection]);
}

$._style = {
  css(param) {
    switch (typeof param) {
      case "string":
        // null 的意思是不返回伪类元素
        return window.getComputedStyle(this[0], null)[param];
      case "object":
        Object.keys(param).forEach(item => {
          this[1].forEach(unit => {
            unit.style[item] = param[item];
          });
        });
        return this;
    }
  },
};

$._event = {
  on(type, methed, useCapture = false) {
    this[1].forEach(item => {
      item.addEventListener(type, methed, useCapture);
    });

    return this;
  },
  off(type, methed) {
    this[1].forEach(item => {
      item.removeEventListener(type, methed);
    });

    return this;
  },
  trigger(eventName, param = { info: "hello" }) {
    let event = {};
    // bubbles：布尔值，表明该事件是否会冒泡
    // cancelable：布尔值，表明否可以取消该事件的默认行为
    // detail：事件初始化时传递的数据
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, { detail: param });
    } else {
      // 官方声明不推荐使用
      event = document.createEvent("CustomEvent");
      // initCustomEvent(eventName, bubbles, cancelable, detail)
      event.initCustomEvent(eventName, true, true, param);
    }

    this[0].dispatchEvent(event);
    return this;
  },
};

$._class = {
  addClass() {
    // el.classList.add(className);
  },
  removeClass() {
    // el.classList.remove(className);
  },
  hasClass() {
    // el.classList.contains(className);
  },
  toggleClass() {
    // el.classList.toggle(className);
  },
};

$._size = {};

$._DOM = {
  append(newEl) {
    this[1].forEach(item => item.appendChild(newEl));
    return this;
  },
  // 将插入元素作为第一个子元素
  prepend(newEl) {
    // el.insertBefore(newEl, el.firstChild);
  },
  // 在选中元素前插入新节点
  insertBefore(newEl) {
    if (this[0].parentNode) this[0].parentNode.insertBefore(newEl, this[0]);
    return this;
  },
  insertAfter(newEl) {
    if (this[0].parentNode)
      this[0].parentNode.insertBefore(newEl, this[0].nextSibling);
    return this;
  },
  remove(el) {
    // 是否能够批处理？
    this[0].parentNode.removeChild(el);
    return this;
  },
  clone(deep = true) {
    // true 表示将递归复制当前节点的所有后代节点
    return this[0].cloneNode(deep);
  },
  // 用指定的元素替换被选的元素
  replaceWith(el) {
    this[0].parentNode.insertBefore(el, this[0]);
    this[0].parentNode.removeChild(this[0]);
    return this;
  },
  // 判断元素是否匹配 css 选择器
  is(select) {
    return this[0].matches(select);
  },
  // 将元素包裹进指定 HTML 结构内（待整理）
  wrap(tag = "div", param = { class: "wrapper" }) {
    const wrapper = document.createElement(tag);
    wrapper.className = param.class;
    this[1].forEach(item => {
      item.parentNode.insertBefore(wrapper, item);
      item.parentNode.removeChild(item);
      wrapper.appendChild(item);
    });

    return this;
  },
  // 移除元素的父元素（待整理；感觉没啥用）
  unwrap() {
    const ParentNode = this[0].parentNode;
    if (ParentNode === document.body) return this;
    ParentNode.parentNode.insertBefore(this[0], ParentNode);
    ParentNode.parentNode.removeChild(ParentNode);
    return this;
  },
};

$._inner = {
  text(param) {
    if (!param) return this[0].textContent;
    this[1].forEach(item => (item.textContent = param));
    return this;
  },
  html(param) {
    if (!param) return this[0].innerHTML;
    this[1].forEach(item => (item.innerHTML = param));
    return this;
  },
  empty() {
    this[1].forEach(item => (item.innerHTML = ""));
    return this;
  },
};

$._ajax = {}; ///
// tool 没想好怎么挂载
$._tools = {
  draw(select) {
    const target = document.querySelector(select);
    let [offsetX, offsetY] = [0, 0];

    //鼠标移动
    function mouseMove(e) {
      target.style.left = `${e.clientX - offsetX}px`;
      target.style.top = `${e.clientY - offsetY}px`;
    }
    //鼠标抬起事件
    function mouseUp() {
      target.style.cursor = "default";

      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }
    // 鼠标按下事件
    target.onmousedown = e => {
      offsetX = e.clientX - target.offsetLeft;
      offsetY = e.clientY - target.offsetTop;
      target.style.cursor = "move";

      document.addEventListener("mousemove", mouseMove, false);
      document.addEventListener("mouseup", mouseUp, false);
    };

    return this;
  },
  // 检测是不是扁平对象 (使用 “{}” 或 “new Object” 创建)
  isPlainObject(obj) {
    if (
      typeof obj !== "object" ||
      obj.nodeType ||
      (obj !== null && obj !== undefined && obj === obj.window)
    )
      return false;

    if (
      obj.constructor &&
      !Object.prototype.hasOwnProperty.call(
        obj.constructor.prototype,
        "isPrototypeOf"
      )
    )
      return false;

    return true;
  },
  // 移除字符串头尾空白
  trim() {
    this[1].forEach(item => item.trim());
    return this;
  },
  type(target) {
    const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
    return Object.prototype.toString
      .call(target)
      .replace(reTypeOf, "$1")
      .toLowerCase();
  },
};

$.Query = {
  init(selection) {
    const newObj = Object.create(this);
    newObj[0] = selection.length === 1 ? selection[0] : selection;
    newObj[1] = selection;

    return newObj;
  },

  ...$._style,
  ...$._event,
  ...$._class,
  ...$._size,
  ...$._DOM,
  ...$._inner,
  ...$._tools,
};

// 解析 HTML/SVG/XML 字符串
$.parse = param => {
  const range = document.createRange();
  const parse = range.createContextualFragment.bind(range);

  return parse(param);
};
