# 第二十章：案件输出标准（Case Output Specification）

## 20.1 设计目标

统一案件输出格式。

保证：

- AI生成器
- 案件引擎
- 前端
- 图片系统
- 语音系统
- 档案系统

使用同一数据结构。

---

## 20.2 核心原则

案件不是文本。

案件是结构化数据。

AI负责生成。

前端负责展示。

---

## 20.3 案件对象结构

```text
Case
├─ Meta
├─ Truth Tree
├─ NPC
├─ Clues
├─ Reversals
├─ Scenes
├─ Images
├─ Audio
├─ Archive
```

---

## 20.4 Meta结构

```json
{
  "case_id":"CASE_D_0001",
  "title":"240号房间",
  "level":"D",
  "template":"失踪事件",
  "district":"大学城",
  "location":"白塔公寓",
  "status":"active"
}
```

---

## 20.5 Truth Tree结构

```json
{
  "truth":"主动失踪",
  "hidden_truth":"组织已发现他",
  "facts":[]
}
```

事实节点：

```json
{
  "fact_id":"F001",
  "content":"离开宿舍",
  "critical":true
}
```

---

## 20.6 NPC结构

```json
{
  "npc_id":"NPC_001",
  "name":"林知远",
  "role":"目击者",
  "credibility":62,
  "secret":"删除录像",
  "known_facts":["F001"]
}
```

---

## 20.7 Clue结构

```json
{
  "clue_id":"CLUE_001",
  "type":"digital",
  "source":"门禁系统",
  "related_fact":"F001",
  "importance":80,
  "content":"凌晨2:13刷卡记录"
}
```

---

## 20.8 Reversal结构

```json
{
  "reversal_id":"REV_001",
  "type":"身份反转",
  "description":"受害者并非受害者"
}
```

---

## 20.9 Scene结构

每个案件由多个场景组成。

```json
{
  "scene_id":"SCENE_001",
  "type":"chat",
  "title":"匿名短信",
  "content":"救救我",
  "choices":[]
}
```

---

## 20.10 Choice结构

```json
{
  "choice_id":"CHOICE_001",
  "text":"查询号码",
  "result":"SCENE_002"
}
```

---

## 20.11 Image结构

```json
{
  "image_id":"IMG_001",
  "scene_id":"SCENE_001",
  "type":"evidence",
  "prompt":"第一视角 都市悬疑 监控截图"
}
```

---

## 20.12 Audio结构

```json
{
  "audio_id":"AUD_001",
  "scene_id":"SCENE_003",
  "type":"voicemail",
  "transcript":"不要相信他们"
}
```

---

## 20.13 Archive结构

```json
{
  "archive_id":"ARCH_001",
  "case_id":"CASE_D_0001",
  "truth":"主动失踪",
  "hidden_truth":"组织已发现他"
}
```

---

## 20.14 调查结果结构

```json
{
  "completion":85,
  "truth_found":true,
  "hidden_truth_found":false,
  "rank":"A"
}
```

---

## 20.15 场景输出规范

所有场景必须包含：

- 场景编号
- UI类型
- 场景文本
- 玩家选项

禁止空场景。

---

## 20.16 图片输出规范

统一要求：

第一视角

真实摄影

都市悬疑

竖屏

电影感

---

## 20.17 语音输出规范

必须包含：

文本内容

说话人

情绪

背景环境

---

## 20.18 校验规则

案件输出前检查：

是否存在真相

是否存在事实节点

是否存在关键线索

是否存在NPC

是否存在场景

是否存在结局

失败则重生成。

---

## 20.19 API输出标准

案件生成器最终返回：

```json
{
  "case":{},
  "truth_tree":{},
  "npcs":[],
  "clues":[],
  "scenes":[],
  "images":[],
  "audio":[]
}
```

---

## 20.20 最终原则

案件首先是数据。

其次才是故事。

所有模块必须围绕统一结构开发。

这是《暗线》从设计阶段进入开发阶段的接口标准。