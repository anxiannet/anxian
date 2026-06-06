# 第十章：场景生成系统（Scene Generation System）

## 10.1 设计目标

场景生成系统负责把案件逻辑转化为玩家可体验的内容。

系统负责：

```text
真相
线索
NPC状态
玩家选择
```

AI负责：

```text
对白
氛围
镜头感
节奏
悬念包装
```

场景不是小说段落。

场景是游戏运行单位。

---

## 10.2 场景的核心原则

每个场景必须至少完成一个功能：

- 推进案件
- 展示线索
- 制造矛盾
- 触发调查选择
- 暴露NPC问题
- 触发反转
- 更新档案
- 连接下一个事件

禁止生成无功能场景。

禁止纯氛围场景。

---

## 10.3 场景类型

### 10.3.1 聊天消息场景

用于模拟短信、私信、群聊、匿名爆料。

适合：

- 首次事件触发
- NPC询问
- 线索提交
- 威胁信息
- 暗线节点接触

UI形式：

```text
聊天气泡
头像
时间戳
已读状态
附件
玩家回复选项
```

---

### 10.3.2 电话来电场景

用于高压、紧急、短时交互。

适合：

- 报案
- 求助
- 警告
- 威胁
- 异常来电

UI形式：

```text
来电界面
接听/拒绝
通话时长
背景噪音标签
录音保存
```

---

### 10.3.3 语音留言场景

用于提供情绪线索和声音证据。

适合：

- 匿名举报
- 最后一段语音
- 恐惧状态
- 环境音分析

UI形式：

```text
音频条
波形
时长
转写文本
环境音标签
玩家标记按钮
```

---

### 10.3.4 监控录像场景

用于空间、时间、动作线索。

适合：

- 公寓走廊
- 电梯
- 停车场
- 校园门口
- 港口仓库

UI形式：

```text
监控画面
时间戳
摄像头编号
暂停/快进
放大区域
可标记异常点
```

---

### 10.3.5 新闻快讯场景

用于城市状态变化。

适合：

- 停电
- 港口事故
- 论坛爆料
- 公寓通告
- 失踪新闻

UI形式：

```text
新闻标题
来源
发布时间
摘要
评论区片段
相关地点
```

---

### 10.3.6 调查界面场景

用于玩家主动选择调查方向。

适合：

- 调查地点
- 询问NPC
- 查看系统记录
- 比对线索
- 搜索档案

UI形式：

```text
调查目标
可选行动
消耗
风险
可能获得线索
```

---

### 10.3.7 地图界面场景

用于城市空间感和地点选择。

适合：

- 白港市地图
- 城区案件分布
- NPC位置
- 异常事件热区
- 路线推理

UI形式：

```text
地图点位
城区标签
距离
事件状态
可前往地点
```

---

### 10.3.8 档案界面场景

用于整理案件进度。

适合：

- 线索归档
- NPC档案
- 真相进度
- 隐藏真相提示
- 结案总结

UI形式：

```text
档案编号
线索列表
人物关系
玩家备注
完成度
提交结论
```

---

### 10.3.9 选择界面场景

用于BitLife式轻量交互。

适合：

- 去哪里调查
- 问谁
- 看什么证据
- 是否质问NPC
- 是否提交推理

UI形式：

```text
短文本描述
2~4个选项
选项后果
属性影响
案件状态变化
```

---

## 10.4 场景标准结构

每个场景必须输出以下字段：

```json
{
  "scene_id": "SCENE_001",
  "case_id": "CASE_001",
  "act": 1,
  "scene_order": 1,
  "scene_type": "chat",
  "title": "凌晨2:13的私信",
  "location": "白塔公寓",
  "time": "02:13",
  "participants": ["NPC_001", "PLAYER"],
  "purpose": "事件触发",
  "related_truth_nodes": ["TRUTH_NODE_001"],
  "related_clues": ["CLUE_CHAT_001"],
  "related_misdirections": ["MIS_TIME_001"],
  "related_reversals": [],
  "content": {},
  "player_options": [],
  "state_changes": {},
  "next_scene_rules": []
}
```

---

## 10.5 聊天场景结构

```json
{
  "scene_type": "chat",
  "content": {
    "chat_platform": "匿名私信",
    "messages": [
      {
        "sender": "NPC_001",
        "time": "02:13",
        "text": "你是不是也收到240号房的消息了？",
        "attachments": [],
        "tone": "紧张"
      },
      {
        "sender": "NPC_001",
        "time": "02:14",
        "text": "别去24楼。那里三年前就封了。",
        "attachments": ["IMG_CORRIDOR_001"],
        "tone": "警告"
      }
    ]
  },
  "player_options": [
    {
      "option_id": "OPT_001",
      "text": "你是谁？",
      "effect": "询问身份",
      "next_scene": "SCENE_002"
    },
    {
      "option_id": "OPT_002",
      "text": "240号房发生了什么？",
      "effect": "推进案件",
      "next_scene": "SCENE_003"
    }
  ]
}
```

---

## 10.6 电话场景结构

```json
{
  "scene_type": "phone_call",
  "content": {
    "caller": "UNKNOWN",
    "caller_display": "未知号码",
    "call_time": "00:47",
    "duration": "00:36",
    "transcript": [
      {
        "speaker": "UNKNOWN",
        "text": "不要相信物业系统。房间没有空。",
        "audio_tags": ["电流声", "雨声", "远处电梯提示音"]
      }
    ],
    "audio_clues": ["CLUE_AUDIO_ELEVATOR_DING"]
  },
  "player_options": [
    {
      "option_id": "OPT_CALL_BACK",
      "text": "回拨号码",
      "effect": "触发号码查询"
    },
    {
      "option_id": "OPT_SAVE_AUDIO",
      "text": "保存录音",
      "effect": "获得语音证据"
    }
  ]
}
```

---

## 10.7 监控场景结构

```json
{
  "scene_type": "surveillance",
  "content": {
    "camera_id": "CAM_BAITOWER_24F_02",
    "location": "白塔公寓24楼走廊",
    "recording_time": "02:08-02:16",
    "visual_description": "昏暗走廊，电梯门在02:13打开，但画面没有出现人影。",
    "visible_events": [
      {
        "time": "02:13:04",
        "event": "电梯门打开",
        "clue_id": "CLUE_ELEVATOR_OPEN"
      },
      {
        "time": "02:13:22",
        "event": "240号门牌反光异常",
        "clue_id": "CLUE_DOOR_REFLECTION"
      }
    ],
    "hidden_observation": {
      "requires_observation": 55,
      "clue_id": "CLUE_SHADOW_FRAME",
      "description": "画面右下角有半帧黑影，被压缩噪点掩盖。"
    }
  }
}
```

---

## 10.8 新闻场景结构

```json
{
  "scene_type": "news_flash",
  "content": {
    "source": "白港晚报",
    "headline": "西港区白塔公寓凌晨短暂停电",
    "published_at": "07:20",
    "summary": "物业称停电由线路老化引起，未造成伤亡。",
    "public_comments": [
      "怎么又是白塔公寓？",
      "昨晚24楼好像有人报警。",
      "官方每次都说线路老化。"
    ],
    "related_city_state": "POWER_OUTAGE_WEST_PORT"
  }
}
```

---

## 10.9 调查场景结构

```json
{
  "scene_type": "investigation",
  "content": {
    "investigation_target": "白塔公寓物业系统",
    "available_actions": [
      {
        "action_id": "ACT_CHECK_ACCESS_LOG",
        "text": "查看门禁记录",
        "requirements": {},
        "possible_clues": ["CLUE_ACCESS_LOG_001"],
        "risk": "低"
      },
      {
        "action_id": "ACT_ASK_SECURITY",
        "text": "询问夜班保安",
        "requirements": {
          "social_min": 35
        },
        "possible_clues": ["CLUE_SECURITY_STATEMENT"],
        "risk": "中"
      }
    ]
  }
}
```

---

## 10.10 档案场景结构

```json
{
  "scene_type": "archive",
  "content": {
    "archive_id": "ARCHIVE_001",
    "case_name": "不存在的240号房",
    "known_clues": ["CLUE_CHAT_001", "CLUE_ELEVATOR_OPEN"],
    "unknown_clue_slots": 3,
    "npc_profiles": ["NPC_001", "NPC_002"],
    "truth_progress": 45,
    "hidden_truth_progress": 10,
    "available_submissions": [
      "提交初步判断",
      "继续调查",
      "标记矛盾"
    ]
  }
}
```

---

## 10.11 玩家选项设计规则

每个选择场景建议提供2~4个选项。

选项必须有明确功能。

常见选项类型：

```text
询问
调查
比对
前往
保存
质问
提交
放弃
等待
```

禁止选项：

```text
继续
看看
想一想
随便逛逛
```

除非它们有明确状态变化。

---

## 10.12 场景状态变化

每个场景可以改变游戏状态。

```json
{
  "state_changes": {
    "add_clues": ["CLUE_CHAT_001"],
    "update_npc_trust": {
      "NPC_001": -10
    },
    "unlock_locations": ["白塔公寓24楼"],
    "unlock_scenes": ["SCENE_004"],
    "add_flags": ["PLAYER_WARNED_ABOUT_24F"],
    "increase_case_progress": 10
  }
}
```

状态变化必须由系统执行。

AI只能描述，不能私自改变状态。

---

## 10.13 场景生成流程

```text
读取真相树
↓
读取当前幕目标
↓
选择场景类型
↓
绑定线索/NPC/误导/反转
↓
生成玩家可见内容
↓
生成玩家选项
↓
生成状态变化
↓
生成下一场景规则
↓
校验场景功能
```

---

## 10.14 场景节奏规则

### 首次体验节奏

```text
第1场：异常消息
第2场：玩家选择是否追查
第3场：获得第一条线索
第4场：出现矛盾
第5场：调查NPC或地点
第6场：误导强化
第7场：关键线索
第8场：反转
第9场：提交推理
第10场：档案归档
```

### 10分钟案件场景数量

建议：

```text
最少：6场
标准：8~10场
最多：12场
```

超过12场容易变成长篇文字游戏。

---

## 10.15 场景校验规则

生成后必须检查：

```text
1. 每个场景是否有明确功能。
2. 每个场景是否绑定案件节点。
3. 每个线索是否至少出现在一个场景中。
4. 每个关键线索是否可被玩家获得。
5. 玩家是否有至少两个主动调查选择。
6. 场景顺序是否符合案件节奏。
7. 是否存在无意义对白。
8. 是否存在长篇说明文本。
9. 是否存在强制玩家接受结论的场景。
```

---

## 10.16 AI场景包装规则

AI可以增强：

- 语气
- 氛围
- 悬念
- 角色声音
- 镜头感
- UI文案

AI不能改变：

- 真相
- 隐藏真相
- 关键线索
- NPC秘密
- 反转结果
- 玩家状态
- 案件等级

---

## 10.17 场景设计原则

场景不是章节。

场景是玩家的一次操作单位。

《暗线》的场景标准：

```text
短。
明确。
有选择。
有线索。
有状态变化。
```

玩家必须在1分钟内知道当前场景要做什么。