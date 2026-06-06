# 第十二章：语音证据系统（Audio Evidence System）

## 12.1 设计目标

声音不是背景音。

声音是证据。

语音证据系统负责：

- 提供听觉线索
- 承载 NPC 信息
- 建立时间与空间关系
- 制造误导
- 支撑反转
- 丰富案件档案

原则：

- 音频必须服务调查。
- 音频必须可分析。
- 音频必须可复听。
- 音频必须可转写。
- 音频中的关键线索必须能被验证。

禁止纯气氛音频。

禁止无意义尖叫、恐吓音、噪音堆叠。

---

## 12.2 音频类型

### 电话录音（Phone Call）

用于展示 NPC 之间的直接交流。

适合承载：

- 情绪变化
- 称呼关系
- 关键时间
- 背景环境
- 语气矛盾

示例：

- 深夜来电
- 未接来电留言
- 通话录音截取
- 催促型电话

---

### 匿名举报（Anonymous Tip）

用于触发案件或提供不完整线索。

适合承载：

- 模糊指认
- 断裂信息
- 故意变声
- 恐惧情绪
- 错误引导

示例：

- 匿名语音消息
- 变声举报录音
- 公共电话亭留言
- 临时邮箱语音附件

---

### 监控录音（Surveillance Audio）

用于时间与空间推理。

适合承载：

- 脚步声
- 电梯提示音
- 门禁蜂鸣
- 远处争吵
- 车辆声
- 环境回声

示例：

- 楼道麦克风录音
- 停车场监控音轨
- 电梯内录音
- 商场广播残留音

---

### 广播（Broadcast）

用于传播城市状态、公共事件或误导性信息。

适合承载：

- 公告
- 新闻播报
- 应急通知
- 地铁广播
- 校园广播

示例：

- 白港地铁临时停运广播
- 白港晚报音频快讯
- 商场寻人广播
- 港口封锁通知

---

### 语音留言（Voice Message）

用于聊天式剧情中的碎片化证据。

适合承载：

- NPC 情绪
- 临时求助
- 短句暗示
- 断句异常
- 背景杂音

示例：

- 微信式语音留言
- 案件群语音
- 失踪前最后留言
- 玩家收到的陌生语音

---

## 12.3 音频结构

音频证据统一结构：

```json
{
  "audio_id": "AUD_001",
  "audio_type": "phone_call",
  "case_id": "CASE_001",
  "scene_id": "SCENE_004",
  "title": "凌晨02:13的来电",
  "duration_seconds": 18,
  "source": "匿名号码",
  "speaker_ids": [
    "NPC_001"
  ],
  "location_hint": "白塔公寓24楼",
  "timestamp_hint": "02:13",
  "environment_tags": [],
  "visible_clues": [],
  "hidden_clues": [],
  "misdirection_tags": [],
  "transcript": "",
  "analysis_requirement": 0
}
```

字段说明：

- `audio_id`：音频唯一编号。
- `audio_type`：音频类型。
- `case_id`：所属案件。
- `scene_id`：所属场景。
- `duration_seconds`：音频长度，建议 5 到 45 秒。
- `source`：音频来源。
- `speaker_ids`：说话人编号，可为空。
- `location_hint`：地点提示，不等于最终真相。
- `timestamp_hint`：时间提示，不等于最终真相。
- `environment_tags`：环境音标签。
- `visible_clues`：直接可听出的线索。
- `hidden_clues`：需要复听、对比或转写后发现的线索。
- `misdirection_tags`：误导标签。
- `analysis_requirement`：分析门槛，对应玩家属性或系统分析能力。

---

## 12.4 环境音标签

环境音不是装饰。

环境音必须用于地点、时间、人物或事件判断。

常用标签：

```json
{
  "environment_tags": [
    "rain",
    "elevator_ding",
    "access_control_beep",
    "harbor_foghorn",
    "subway_announcement",
    "parking_echo",
    "footsteps",
    "distant_argument",
    "air_conditioner_hum",
    "keyboard_typing",
    "phone_vibration",
    "door_closing"
  ]
}
```

标签设计规则：

- 每段音频建议 1 到 4 个环境音标签。
- 至少 1 个标签应具备调查价值。
- 环境音不得与场景设定冲突。
- 环境音可以制造误导，但必须能被后续解释。

示例：

- `harbor_foghorn`：暗示录音地点靠近港口。
- `elevator_ding`：暗示楼层、电梯或时间节点。
- `access_control_beep`：暗示门禁记录可交叉验证。
- `parking_echo`：暗示空间开阔或地下停车场。

---

## 12.5 可分析线索

音频中的线索分为：

### 语言线索

玩家能从说话内容直接获得的信息。

例如：

- 人名
- 称呼
- 时间
- 地点
- 威胁
- 否认
- 口误

---

### 声纹线索

玩家通过声音特征判断说话人。

例如：

- 声音年龄感
- 口音
- 语速
- 习惯性停顿
- 咳嗽
- 变声痕迹

---

### 环境线索

玩家通过背景音判断地点或事件。

例如：

- 电梯提示音
- 雨声
- 港口汽笛
- 地铁广播
- 门禁蜂鸣

---

### 时间线索

玩家通过声音判断时间顺序。

例如：

- 报时声
- 广播内容
- 末班车提示
- 凌晨施工声
- 同一声音在不同录音中重复出现

---

### 技术线索

玩家通过音频质量判断来源。

例如：

- 剪辑痕迹
- 降噪残留
- 变声器痕迹
- 左右声道异常
- 音量突变
- 背景音断裂

---

## 12.6 音频转写

所有剧情关键音频必须提供转写文本。

转写文本不是答案。

转写文本只负责降低理解门槛。

标准结构：

```json
{
  "audio_id": "AUD_001",
  "transcript": [
    {
      "time": "00:01",
      "speaker": "未知男声",
      "text": "你现在不要上去。"
    },
    {
      "time": "00:04",
      "speaker": "未知女声",
      "text": "可是24楼的灯已经亮了。"
    },
    {
      "time": "00:07",
      "speaker": "环境音",
      "text": "远处传来电梯到达提示音。"
    }
  ]
}
```

转写规则：

- 关键句必须标注时间点。
- 不确定内容使用 `[听不清]`。
- 环境音可以进入转写，但必须明确标为环境音。
- 转写不得补充音频中不存在的信息。
- 转写不得直接解释真相。

---

## 12.7 NPC 声音档案

NPC 可以拥有声音档案。

声音档案用于后续对比与识别，不用于复杂建模。

结构：

```json
{
  "npc_id": "NPC_001",
  "voice_profile": {
    "voice_age": "30-40",
    "gender_presentation": "male",
    "accent": "轻微白港本地口音",
    "speech_speed": "偏慢",
    "habitual_phrases": [
      "你听我说",
      "这件事不是这样"
    ],
    "voice_marks": [
      "轻微鼻音",
      "句尾压低"
    ]
  }
}
```

使用规则：

- 声音档案只能辅助判断，不能单独定罪。
- 声音档案必须来自已获得的音频证据。
- 声音相似不等于同一人。
- AI 不得凭空生成 NPC 的新声音特征。

---

## 12.8 音频对比系统

音频对比用于发现重复声音、伪装声音与环境重合。

对比对象包括：

- 说话人声音
- 口头禅
- 背景音
- 录音设备噪声
- 时间戳矛盾
- 剪辑痕迹

结构：

```json
{
  "comparison_id": "CMP_AUD_001",
  "audio_ids": [
    "AUD_001",
    "AUD_006"
  ],
  "comparison_type": "environment_match",
  "result": {
    "similarity": 0.82,
    "matched_detail": "两段录音中都出现相同的电梯提示音",
    "confidence": "medium",
    "conclusion": "可能来自同一栋建筑或同型号电梯"
  }
}
```

对比结论规则：

- 使用“可能”“疑似”“高度相似”等概率表达。
- 禁止直接输出最终真相。
- 高相似度也必须保留误差空间。
- 关键结论必须能通过其他线索交叉验证。

---

## 12.9 音频误导

音频误导用于制造判断偏差。

允许的误导方式：

- 变声器
- 背景音伪造
- 剪辑拼接
- 故意留下错误地点暗示
- 使用他人手机发送语音
- 复读旧录音
- 在相似环境中制造混淆

禁止的误导方式：

- 完全无法识破的伪造
- 后期强行解释
- 与已有证据冲突但不交代
- 让玩家无法通过观察发现破绽

误导结构：

```json
{
  "misdirection_tags": [
    "voice_changer",
    "fake_background_noise",
    "edited_sequence"
  ],
  "detectable_flaws": [
    "背景雨声循环重复",
    "一句话前后底噪不同",
    "门禁蜂鸣与记录时间不一致"
  ]
}
```

---

## 12.10 音频反转

音频反转必须基于玩家已经听过的内容。

反转不是新增信息。

反转是重新理解旧信息。

常见反转方式：

- 说话人身份反转
- 背景地点反转
- 时间顺序反转
- 求助者身份反转
- 威胁者与受害者关系反转
- 录音来源反转

示例：

```json
{
  "reversal_type": "speaker_identity",
  "old_understanding": "匿名举报者是目击者",
  "new_understanding": "匿名举报者可能就是事件参与者",
  "required_clues": [
    "AUD_001中的口头禅",
    "AUD_004中的相同咳嗽声",
    "门禁记录中的02:13进入记录"
  ]
}
```

反转规则：

- 反转必须有伏笔。
- 反转必须可回听验证。
- 反转不能推翻所有前文逻辑。
- 反转后应产生新的调查方向。

---

## 12.11 AI 语音生成规范

统一格式：

```json
{
  "audio_id": "AUD_001",
  "audio_type": "voice_message",
  "duration_seconds": 12,
  "speaker": {
    "role": "未知女声",
    "voice_age": "20-30",
    "emotion": "压低声音、紧张、犹豫",
    "accent": "轻微白港本地口音"
  },
  "content": {
    "script": "我不知道你是谁，但如果你收到这条语音，千万别去24楼。",
    "transcript_visibility": "available_after_playback"
  },
  "environment": {
    "location_hint": "公寓走廊",
    "background_sounds": [
      "低频空调声",
      "远处电梯提示音",
      "轻微雨声"
    ]
  },
  "clues": {
    "visible_clues": [
      "提到24楼"
    ],
    "hidden_clues": [
      "电梯提示音与白塔公寓型号一致"
    ],
    "misdirection_tags": [
      "location_hint_uncertain"
    ]
  },
  "style": "真实手机语音留言，轻微压缩感，低噪声，现代都市悬疑氛围"
}
```

生成原则：

```text
先定义音频类型 再定义说话人 再定义内容 再定义环境音 再定义线索 最后定义真实感与限制
```

AI 不得擅自添加：

- 新线索
- 新 NPC
- 新真相
- 新组织
- 真实人物
- 真实地址
- 无法验证的声音细节

音频长度建议：

- 语音留言：5 到 15 秒。
- 电话录音：10 到 30 秒。
- 匿名举报：8 到 20 秒。
- 监控录音：10 到 45 秒。
- 广播：8 到 25 秒。

所有 AI 生成音频必须输出：

```json
{
  "audio_asset": {},
  "transcript": [],
  "clues": {},
  "validation": {
    "style_pass": true,
    "clue_pass": true,
    "truth_leak": false,
    "pass": true
  }
}
```
