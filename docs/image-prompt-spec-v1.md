# 《暗线（ANXIAN）》图片提示词规范 v1.0

## 目标

本规范用于统一《暗线》案件场景图的AI生成标准。

所有图片必须服务于：

- 手机竖屏体验
- 第一视角沉浸
- 都市悬疑气质
- 快速理解事件
- 程序后期叠加UI

## 基础格式

统一使用竖屏构图。

推荐比例：9:16。

画面必须预留UI空间：

- 上方20%：拟声、空间对白、状态变化
- 中部55%：核心事件画面
- 下方25%：选择按钮与互动UI

禁止把按钮、系统提示、说明框直接画进图片。

## 白港市视觉关键词

固定关键词：

- modern coastal metropolis
- realistic urban China/Singapore/Hong Kong style city
- cinematic thriller
- photorealistic
- first person point of view
- mobile vertical composition
- high detail
- readable lighting
- grounded modern life

中文理解：

- 现代海港城市
- 国际化都市
- 写实电影感
- 普通人的真实生活
- 正常城市中的异常事件

## 禁止风格

禁止使用以下方向：

- 废土
- 鬼屋
- 破木门
- 中世纪
- 赛博朋克过度霓虹
- 末日城市
- 生化危机式场景
- 怪物恐怖片

《暗线》不是恐怖逃生游戏。

《暗线》是现实都市调查游戏。

## 第一视角要求

每张关键场景图必须让玩家感觉：

我就在现场。

推荐第一视角锚点：

- 手
- 手机
- 腿
- 方向盘
- 电脑键盘
- 门把手
- 猫眼视角
- 电梯按钮
- 监控屏幕

禁止纯第三人称观察。

## 光影要求

信息优先。

重要内容必须清晰：

- 手机消息
- 证据物
- 门锁
- 人物动作
- 关键异常

氛围区域可以暗：

- 房间角落
- 远处背景
- 城市夜景
- 墙面阴影

画面必须在白天手机屏幕上仍可辨认。

## 手机画面要求

手机可以出现在图中，但只显示关键短信息。

推荐：

- 不要开门。
- 他们找到你了。
- 不要让他们看到手机。
- 你真的不记得昨晚了吗？

禁止长文本。

禁止复杂聊天记录。

手机屏幕亮度必须高于周围环境。

## 场景构图模板

### 模板1：公寓门口危机

第一视角，现代青年公寓，暴雨夜，智能防盗门关闭，门底透出走廊灯光，门底有多个脚影经过，猫眼可见，防盗链绷紧，手机在前景显示短信息，窗外能看到雨夜城市灯光，写实电影感，竖屏9:16，顶部和底部留白用于UI。

### 模板2：猫眼视角

第一视角通过猫眼观察走廊，鱼眼畸变，现代公寓走廊，走廊灯光偏冷，门外只能看到鞋、脚步、手电光和模糊身体轮廓，看不清脸，地面有雨水脚印，写实电影感，竖屏9:16。

### 模板3：手机证据

第一视角，手机屏幕占前景但不遮挡全画面，屏幕显示一张模糊监控截图，截图里的人穿着与玩家当前可见衣物相同的鞋或外套，现实场景与手机证据形成对照，写实电影感，竖屏9:16。

### 模板4：监控室/档案室

第一视角站在现代监控室或档案终端前，多个屏幕显示白港市不同角落，某一屏幕出现异常画面，其他屏幕作为背景气氛，主屏幕清晰可见，竖屏9:16，底部预留选择按钮。

### 模板5：街头追踪

第一视角在雨夜街头或地下通道，前方目标即将转角，地面反射城市灯光，行人模糊，目标清晰但不露完整身份，画面有运动感但主体清楚，竖屏9:16。

## 提示词结构

每个提示词建议按以下结构生成：

1. 场景位置
2. 第一视角锚点
3. 当前危机或异常
4. 关键证据或信息
5. 白港市现代都市元素
6. 光影要求
7. UI留白要求
8. 禁止元素

## 示例提示词

### 首页第一镜头

A photorealistic cinematic first-person view inside a modern young apartment in White Harbor at rainy night, sitting on a bed or sofa, one hand holding a bright smartphone showing short Chinese warning messages, a closed smart security door in the center background, light leaking from under the door, several moving foot shadows visible only through the gap under the door, visible peephole and smart lock, subtle tension on the door chain, rainy city lights through the window, realistic modern urban thriller mood, readable lighting for mobile screen, vertical 9:16 composition, leave clean empty space at top and bottom for UI overlays, no buttons, no explanatory text boxes, no horror monster, no broken wooden door.

## 负面提示词

统一排除：

- fantasy
- medieval
- zombie
- monster
- haunted house
- abandoned hospital
- ruined wooden door
- post-apocalyptic
- excessive cyberpunk neon
- third person character shot
- game UI buttons
- tutorial text
- speech bubbles baked into image
- unreadable dark image

## 输出检查标准

生成图片后必须检查：

1. 是否是现代都市？
2. 是否符合白港市？
3. 是否第一视角？
4. 是否手机竖屏可用？
5. 是否上下留白？
6. 是否没有把UI画死？
7. 是否一眼能看懂危险或异常？
8. 是否没有变成恐怖逃生游戏？
9. 是否可以由程序继续叠加拟声、对白和按钮？

## 最终原则

图片不是插画。

图片是互动短剧的关键帧。

玩家看到图片后，必须立刻产生：

“这件事正在发生。”