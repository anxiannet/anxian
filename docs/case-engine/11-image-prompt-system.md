# 第十一章：图片生成系统（Image Prompt System）

## 11.1 设计目标

图片不是插图。

图片是证据。

图片系统负责：

- 场景展示
- 线索承载
- 氛围营造
- 误导设计
- 反转铺垫
- 档案记录

原则：

- 图片必须服务调查。
- 图片必须可观察。
- 图片必须可验证。

禁止纯装饰图片。

---

## 11.2 图片类型

### 场景图（Scene Image）

展示当前调查场景。

例如：

- 公寓走廊
- 校园角落
- 港口仓库
- 地铁站

---

### 证据图（Evidence Image）

用于展示具体证据。

例如：

- 门禁记录
- 照片截图
- 纸质文件
- 手机界面

---

### 监控图（Surveillance Image）

用于时间与空间推理。

例如：

- 电梯监控
- 停车场监控
- 楼道监控

---

### 新闻图（News Image）

用于城市状态传播。

例如：

- 新闻截图
- 公告通知
- 社交媒体热帖

---

### 地图图（Map Image）

用于空间调查。

例如：

- 白港市地图
- 公寓平面图
- 热点区域图

---

### 档案图（Archive Image）

用于案件归档。

例如：

- 案件封面
- NPC 档案
- 都市传说卡片

---

## 11.3 统一视觉风格

所有图片必须遵循：

```text
第一视角 真实摄影 都市悬疑 现代城市 竖屏 电影感 轻微纪实风
```

禁止：

- 二次元
- 卡通
- Q版
- 超现实拼贴
- 科幻 UI 泛滥

---

## 11.4 图片标准结构

```json
{
  "image_id": "IMG_001",
  "image_type": "evidence",
  "case_id": "CASE_001",
  "scene_id": "SCENE_003",
  "location": "白塔公寓24楼",
  "visible_clues": [],
  "hidden_clues": [],
  "misdirection_tags": [],
  "prompt": "",
  "observation_requirement": 0
}
```

---

## 11.5 场景图模板

```json
{
  "image_type": "scene",
  "purpose": "场景建立",
  "visible_elements": [
    "走廊",
    "电梯",
    "门牌"
  ],
  "visible_clues": [],
  "hidden_clues": []
}
```

Prompt 结构：

```text
第一视角 白港市现代公寓 昏暗走廊 24楼 电影感 竖屏摄影
```

---

## 11.6 证据图模板

```json
{
  "image_type": "evidence",
  "evidence_type": "photo",
  "visible_clues": [
    "门禁编号"
  ],
  "hidden_clues": [
    "反光中的人影"
  ]
}
```

证据图必须允许玩家放大查看。

---

## 11.7 监控图模板

```json
{
  "image_type": "surveillance",
  "camera_id": "CAM_24F",
  "timestamp": "02:13",
  "visible_clues": [
    "电梯门打开"
  ],
  "hidden_clues": [
    "半帧黑影"
  ]
}
```

视觉要求：

```text
监控噪点 时间戳 广角畸变 低照度
```

---

## 11.8 新闻图模板

```json
{
  "image_type": "news",
  "headline": "白塔公寓凌晨停电",
  "source": "白港晚报",
  "visible_clues": [],
  "misdirection_tags": []
}
```

表现形式：

- 新闻截图
- 社交媒体截图
- 论坛帖子截图

---

## 11.9 地图图模板

```json
{
  "image_type": "map",
  "district": "西港区",
  "points": [
    "白塔公寓",
    "港口仓库"
  ]
}
```

用于：

- 路径推理
- 时间推理
- 地点关联

---

## 11.10 档案图模板

```json
{
  "image_type": "archive",
  "archive_id": "ARCHIVE_001",
  "case_name": "不存在的240号房"
}
```

表现：

```text
案件封面 调查员笔记 线索汇总
```

---

## 11.11 图片线索规则

图片中的线索分为：

### 明线线索

玩家直接可见。

### 暗线线索

需要观察。

### 关键线索

影响真相。

### 误导线索

影响判断。

---

## 11.12 隐藏线索规则

隐藏线索必须：

```text
真实存在 可被发现 可被验证
```

禁止：

```text
只有作者知道 无法观察 无法解释
```

---

## 11.13 图片校验器

生成后检查：

```text
是否符合风格 是否存在真实地址 是否包含真实人物 是否暴露最终真相 是否包含关键线索 是否包含误导线索 是否可观察
```

输出：

```json
{
  "validation": {
    "style_pass": true,
    "clue_pass": true,
    "truth_leak": false,
    "pass": true
  }
}
```

---

## 11.14 AI 图片 Prompt 规范

统一格式：

```json
{
  "perspective": "first_person",
  "style": "realistic urban suspense photography",
  "orientation": "vertical",
  "location": "白塔公寓24楼",
  "visible_elements": [
    "旧门牌",
    "电梯",
    "走廊"
  ],
  "hidden_detail": "门牌反光中的模糊黑影",
  "mood": "冷色调、压抑、电影感"
}
```

Prompt 原则：

```text
先描述场景 再描述证据 再描述隐藏细节 最后描述氛围
```

AI 不得擅自添加：

- 新线索
- 新 NPC
- 新真相
- 新组织
- 真实人物
- 真实地址
