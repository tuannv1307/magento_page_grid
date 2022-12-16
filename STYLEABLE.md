# STYLEABLE

## Import syntax

- Có 2 cách để thêm một Style của một component:

C1: Được khuyến khích

```sh
    @st-import DefaultComp , [somePar, someVar] from './stylesheet.st.css';
```

C1:

```sh
    :import {
        -st-from: 'stylesheet.st.css';
        -st-default: <Default_name>;
        -st-named: <Name_Part1, Name_Part2, ...>;
    }
```

## Root

- Mỗi một component đều có một lớp của riêng mình gọi là root.
- root biểu thị một thành phần cấp cao nhất. Nó cung cấp một phạm vi cho phép người sử dụng
  không vượt ra ngoài component.

```sh
    import {st, classes} from './Comp.st.css';

    const Comp = (props) => {
        return (
            <div className={st(classes.root, {}, props.className)}>
                // code here
            </div>
        );
    }
```

`Styleable file`:

```sh
    @namespace "Comp";

    .root { background-color: red; }
```

`Css output:`

```sh
    .Comp_root { background-color: red; }
```

## Class Selectors

- Sử dụng các class css để xác định tên cục bộ của các thành phần bên trong.
- Nên sử dụng camelCase để đặt tên cho class. Tránh sử dụng (-) gạch ngang hoặc các chữ cái đầu tiên viết hoa.

```
    import { st, classes } from './comp.st.css';

    const Comp = () => {

        return (
            <div className={st(classes.root, {}, props.className)}>
                <img src="/" className={classes.thumbnail}/>
            </div>
        );
    }
```

`comp.st.css file:`

```
    @namespace "Page";

    .root { background: green; }
    .thumbnail { background: red; }
    .thumbnail:hover { background: blue; }
```

`=> output:`

```
    .Page_root { background: green; }
    .Page_thumbnail { background: red; }
    .Page_thumbnail:hover { background: blue; }
```

### - Class selector export

`Button.st.css`

```
    @namespace "Button";
    .root {}
    .icon { color: red; }
```

`Form.st.css`

```
@namespace "Form";

@st-import Button, [icon] from './Button.st.css';

.root Button .icon {
    background: #fff;
}

.root Button:hover .icon {
    background: #ccc;
}

.myIcon {
    -st-extends: icon;
}
```

## Pseudo-Classes Parameters

### 1. Tag:

- Xác định trạng thái tùy chỉnh với `tag value` (phân tách bởi khoảng trắng)

`Component`

```
<span className={ st(classes.root, {cart: "shirt}) }></span>
```

`file styleable`:

```
.root {
    -st-states: cart(tag);
}

.root:cart(shirt) {
    // code argument
}

.root:cart(pants) {
    // code argument
}
```

`output`

```
    <span className="style__root style---cart-5-shirt" />
```

### 2. Enum:

- Có thể xác định trạng thái tùy chỉnh với các tùy chọn có sẵn trong `enum`
- Giống với tag, nhưng `enum` chỉ cho phép chọn các giá trị có sẵn

`Component`

```
<span className={ st(classes.root, {size: "medium"}) }>
```

`File styleable`

```
.root {
    -st-states: size( enum(small, medium, large) );
}

.root:size(medium) {
    // code argument
}

.root:size(huge) {
    // code không hợp lệ, vì option không có trong enum
}
```

`output`

```
    <span className="style--size-medium" />
```

### 3. String:

- Có thể xác định trạng thái tùy chỉnh với một giá trị `string`

`Component`

```
<span className={ st(classes.root, {selected: "username"}) }>
```

`File styleable`

```
.root {
    -st-states: selected( string );
}

.root:selected(username) {
    // code argument
}

```

`output`

```
    <span className="style--selected-username" />
```

### 4. Number:

- Có thể xác định trạng thái tùy chỉnh với một giá trị `number`

`Component`

```
<span className={ st(classes.root, {column: 5}) }>
```

`File styleable`

```
.root {
    -st-states: column( number );
}

.root:selected(5) {
    // code argument
}

```

`output`

```
    <span className="style---column-1-5" />
```

## Pseudo-Elements

- Sử dụng `[::]` để ghi đè tag

```sh
@namespace "VideoPlayer";

.root {}
.playButton {
    background: black;
    color: white;
}
```

```sh
@namespace "Page"

@st-import VideoPlayer from "./video-player.st.css";

.mainVideo {
    -st-extends: VideoPlayer;   /* Định nghĩa mainVideo kế  thừa VideoPlayer */
}

.mainVideo::playButton {    /* Ghi đè style của playButton */
    background: green;
    color: purple;
}

```

## Custom Selectors

- Sử dụng custom selectors để đặt bí danh khớp với các selectors
- Có thể xác định một nhóm các selectors với một tên
  VD:

```sh
@namespace "Comp";
@custom-selector :--controlBtn :global(.controls .btn);

:--controlBtn { border: 1px solid grey; }

:--controlBtn:hover { border-color: red; }
```

`output`

```sh
selector: .Comp__controls .Comp__btn
selector: .Comp__controls .Comp__btn:hover
```

`Important`

- VD ở trên có nghĩa là:
  - Khai báo cụm class .controls .btn sử dụng bí danh :--controlBtn
  - Sử dụng bí danh :--controlBtn như một selector và thêm các style, khi đó cụm sử dụng bí danh này nhận được style.

## Mixins

- Cho phép sử dụng lại các style và và hành vi phức tạp, được định nghĩa trọng css hoặc javascript
- Các trường hợp nên sử dụng mixins:
  - Presets/Variants
  - Layout
  - Effects
  - Macros

`Ex`

```sh
    .style-mixin {
        color: green;
        background: yellow;
    }

    .someClass {
        -st-mixin: style-mixin;
    }
```

`output`

```sh
    .someClass {
        color: green;       /* from local mixin */
        background: yellow; /* from local mixin */
    }
```

### - Mixin với các tham số và biến:

```sh
    mixin(variableName valueOverride, variableName2 valueOverride2)
```

`Ex`

```sh
    :vars {
        color1: green;
    }

    .classToMixin {
        background: value(color1);
    }

    .targetClass {
        -st-mixin: classToMixin(color1 orange);
    }
```

`Output`

```sh
    .classToMixin {
        background: green;      /* from local class */
    }

    .targetClass {
        background: orange;     /* from mixin with override */
    }
```

### - JavaScript mixins

`my-mixin.js file`

```sh
    module.exports = function colorAndBg([color, bgColor]){
        /* arguments: array of string types */

        return {
            color: color,
            background: bgColor
        }
    };
```

`styleable`

```sh
    @st-import colorAndBg from "./my-mixin";

    .codeMixedIn {
        -st-mixin: colorAndBg(green, orange);
        font-family: monospace;
    }
```

`Output`

```sh
    .codeMixedIn {
        color: green; /* from JS mixin */
        background: orange; /* from JS mixin */
        font-family: monospace; /* from local class */
    }
```

## Formatters

- Là một hàm trả về một giá trị khai báo css duy nhất. Nó nhận các đối số, xử lý chúng và trả về giá trị. (sử dụng file js để tính toán)

`calc-font-size.js`

```sh
    module.exports = function(baseSize, modifier) {
        switch (modifier) {
            case 'header':
                return `${Number(baseSize) * 2}px`;
            case 'aside':
                return `${Number(baseSize) * 0.75}px`;
            default:
                return baseSize + 'px';
        }
    };
```

`Styleable`

```sh
    @st-import calcFontSize from "./calc-font-size";

    .header {
        font-size: calcFontSize(16, header);
    }

    .form {
        font-size: calcFontSize(16, body);
    }
```

`Output`

```sh
    /* CSS output */
    .header {
        font-size: 32px;
    }

    .form {
        font-size: 16px;
    }
```

## Styleable Variables

- Sử dụng Variables để khai báo các giá trị chung sẽ được sử dụng trong trên stylesheet, chúng có thể được chia sẻ và tạo chủ đề chung

```sh
@namespace "Example1";
:vars {
    color1: red;
    color2: green;
}
.root {
    color: value(color1);
    background: value(color2);
}
```

```sh
@namespace "Example2";
@st-import [color1, color2] from "./example1.st.css";

.root {
    border: 10px solid value(color1);
}
.root:hover {
    border: 10px solid value(color2);
}
```

`Note`: Có thể đặt một giá trị của một biến bằng cách sử dụng một biến khác

```sh
@namespace "Example3";
@st-import [color1, color2] from "./example1.st.css";

:vars {
    border1: 10px solid value(color1); /* use color1 in a complex value */
}
.root {
    border: value(border1); /* user border1 */
}
```

`Output`

```sh
.Example3__root {
    border: 10px solid red; /* 10px solid {color1} */
}
```

`Advanced:`

1. `st-map`: Có thể nhóm các biến theo ngữ cảnh và truy xuất chúng theo `key`

```sh
    :vars {
        colors: st-map(
            bg green,
            text red
        );
    }

    .root {
        background-color: value(colors, bg); /* green */
    }
```

2. `st-array`: Có thể nhóm các biến theo ngữ cảnh và truy xuất chúng theo `index`

```sh
    :vars {
        colors: st-array(red, green);
    }

    .root {
        background-color: value(colors, 1); /* green */
    }
```

## Css Custom Properties

- Cung cấp khả năng xác định và sử dụng lại các biến tham gia vào thời gian chạy.
- Được xác định bằng cú pháp: --_ và truy cập bằng cách sử dụng function var(--_)

`entry.st.css`

```sh
.root {
    --myVar: green;
    color: var(--myVar);
}
```

`Output`

```sh
.root {
    --entry-myVar: green;
    color: var(--entry-myVar);
}
```

`Import ( entry.st.css)`

```sh
@st-import [--myVar] from "./imported.st.css";

.root {
    /* value determined by the nearest property assignment up the DOM tree */
    color: var(--myVar);
}

.part {
    /* this override will match the namespace of the imported stylesheet */
    --myVar: gold;
    background-color: var(--myVar); /* gold */
}
```

### Overriding Css variable

- Ghi đè bất kì biến nào bằng cách xác định lại giá trị của nó bằng thuộc tính kiểu nội tuyến
  `Component`

```sh
import { classes, vars } from './entry.st.css';

<div className={classes.root}
     style={{
        [vars.myVar]: 'pink',
        background: 'gold' }}
/>
```

`Output`

```sh
<div className="entry__root"
     style="--entry-color: green; --entry-border-size: 5px; background: gold;" >
</div>
```

## Scoping

- Cho phép bạn bao bọc một số style-rules bằng cách sử dụng một chỉ thị duy nhất.
- Có thể tạo kiểu tương tự về hoạt động của nó với CSS lông nhau, nhưng chỉ áp dụng cho một cấp duy nhất

`Ex`

```sh
/* entry.st.css */
@st-scope .root {
    input { color: purple; }
}
```

`Output`

```sh
.entry__root input {
    color: purple;
}
```

## Namespace

- Có thể thêm thủ công các lớp không gian class để có thể dễ dàng xác định chúng hơn khi chúng được hiển thị trong đầu ra CSS

```sh
@namespace "my-gallery";
.root { color: red; }
```

`Output`

```sh
.my-gallery__root { color: red; }
```

> `Note:` Bởi vì @namespace không phải là duy nhất, tên trong scoped vẫn có thể có thêm hậu tố để làm cho nó trở thành duy nhất

## Using External Assets

- Hỗ trợ url để sử dụng nội dung như trong CSS
- Giá trị truyền vào hàm url được giải quyết theo cách khác trong CSS

```sh
.root {
  /* resolves as the node request: "my-package/asset.png" */
  background: url(~my-package/asset.png);
}

.root {
  /* resolves as the node request: "./my-package/asset.png" */
  background: url(my-package/asset.png);
}
```

## Keyframes

- Giống với CSS, kiểm soát các bước trung gian trong chuỗi animation

```sh
@namespace "Comp";

@keyframes slide {
  from { transform: translateX(0%); }
  to { transform: translateX(100%); }
}

.root {
    animation-name: slide;
}
```

`Output`

```sh
@keyframes Comp__slide {
  from { transform: translateX(0%); }
  to { transform: translateX(100%); }
}

.Comp__root {
    animation-name: Comp__slide;
}
```
