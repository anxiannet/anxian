export type StatKey = "观察" | "社交" | "推理" | "胆量" | "运气";

export type Clue = {
  id: string;
  index: string;
  title: string;
  type: string;
  time: string;
  summary: string;
};

export type ChoiceEffect = {
  stat?: StatKey;
  amount?: number;
  flag?: "repliedAnonymous";
};

export type Choice = {
  id: string;
  text: string;
  reply: string;
  next: string;
  effect?: ChoiceEffect;
};

export type Scene = {
  id: string;
  sender: string;
  role: "anonymous" | "system" | "property" | "darkline";
  time: string;
  content: string;
  detail?: string;
  clueId?: string;
  choices: Choice[];
};

export const clues: Clue[] = [
  {
    id: "anonymous-message",
    index: "01",
    title: "匿名消息",
    type: "聊天记录",
    time: "02:10",
    summary: "发送时间比手机当前时间快 7 分钟，来源号码不存在。",
  },
  {
    id: "camera-still",
    index: "02",
    title: "2:17 监控截图",
    type: "图像证据",
    time: "02:17",
    summary: "住户进入电梯后，画面出现一次无丢帧的短暂重影。",
  },
  {
    id: "property-bot",
    index: "03",
    title: "物业机器人回复",
    type: "系统回执",
    time: "02:14",
    summary: "机器人坚持监控与门禁记录均通过完整性校验。",
  },
  {
    id: "elevator-log",
    index: "04",
    title: "电梯出入记录",
    type: "设备日志",
    time: "02:17",
    summary: "电梯先收到 1 层指令，随后在 17 层停留了 43 秒。",
  },
  {
    id: "phone-location",
    index: "05",
    title: "手机定位",
    type: "数字线索",
    time: "02:21",
    summary: "设备最后位置停在 17 层消防通道，信号仍在移动。",
  },
  {
    id: "floor-noise",
    index: "06",
    title: "第 17 层异常噪音记录",
    type: "环境录音",
    time: "02:24",
    summary: "录音中出现电梯到达音，但当时电梯实际位于 1 层。",
  },
];

export const scenes: Record<string, Scene> = {
  message: {
    id: "message",
    sender: "未知号码",
    role: "anonymous",
    time: "02:10",
    content: "别报警。你现在看到的监控，是假的。",
    detail: "消息标记为“来自 7 分钟后”。系统无法识别发送号码。",
    clueId: "anonymous-message",
    choices: [
      {
        id: "reply",
        text: "回复：你是谁？",
        reply: "你是谁？你怎么知道我在看监控？",
        next: "camera",
        effect: { flag: "repliedAnonymous", stat: "胆量", amount: 3 },
      },
      {
        id: "timestamp",
        text: "先检查发送时间",
        reply: "我先核对消息时间和本机时钟。",
        next: "camera",
        effect: { stat: "观察", amount: 3 },
      },
      {
        id: "trace",
        text: "尝试查询号码",
        reply: "查询号码来源与转发路径。",
        next: "camera",
        effect: { stat: "推理", amount: 2 },
      },
    ],
  },
  camera: {
    id: "camera",
    sender: "雾灯公馆 · 监控回放",
    role: "system",
    time: "02:12",
    content: "02:17，一名住户走入电梯。门关闭后，他没有出现在任何楼层。",
    detail: "画面连续，校验码完整。电梯镜面里却多出一个延迟半拍的人影。",
    clueId: "camera-still",
    choices: [
      {
        id: "frame",
        text: "逐帧查看镜面",
        reply: "放大镜面重影，检查是否存在剪辑点。",
        next: "property",
        effect: { stat: "观察", amount: 3 },
      },
      {
        id: "export",
        text: "导出画面校验码",
        reply: "比对原始文件的时间戳与校验码。",
        next: "property",
        effect: { stat: "推理", amount: 3 },
      },
    ],
  },
  property: {
    id: "property",
    sender: "雾灯物业助手",
    role: "property",
    time: "02:14",
    content: "住户于 02:19 正常离开大楼。门禁记录与监控文件均无异常。",
    detail: "自动回复重复了两遍，并拒绝提供 17 层的实时画面。",
    clueId: "property-bot",
    choices: [
      {
        id: "ask-exit",
        text: "追问离开方式",
        reply: "02:19 从哪个出口离开？是否有人脸记录？",
        next: "elevator",
        effect: { stat: "社交", amount: 3 },
      },
      {
        id: "ask-floor",
        text: "追问 17 层状态",
        reply: "为什么拒绝提供 17 层画面？",
        next: "elevator",
        effect: { stat: "胆量", amount: 2 },
      },
    ],
  },
  elevator: {
    id: "elevator",
    sender: "设备日志 · E2 电梯",
    role: "system",
    time: "02:16",
    content: "02:17 接收 1 层指令。02:18 在 17 层停留 43 秒。02:19 抵达 1 层。",
    detail: "停留期间没有开门记录，但轿厢重量减少了 68 千克。",
    clueId: "elevator-log",
    choices: [
      {
        id: "weight",
        text: "标记重量变化",
        reply: "没有开门，重量为什么会减少？",
        next: "location",
        effect: { stat: "推理", amount: 3 },
      },
      {
        id: "floor",
        text: "核对 17 层门磁",
        reply: "检查 17 层电梯门与消防门磁记录。",
        next: "location",
        effect: { stat: "观察", amount: 2 },
      },
    ],
  },
  location: {
    id: "location",
    sender: "设备定位 · WH-17",
    role: "system",
    time: "02:21",
    content: "住户手机仍在 17 层消防通道。定位点在缓慢移动，但现场感应灯没有亮。",
    detail: "定位签名有效，信号时间比物业系统快 4 分钟。",
    clueId: "phone-location",
    choices: [
      {
        id: "timeline",
        text: "排列三组时间",
        reply: "把监控、门禁和定位按各自系统时钟排列。",
        next: "noise",
        effect: { stat: "推理", amount: 4 },
      },
      {
        id: "signal",
        text: "检查信号运动轨迹",
        reply: "判断定位点是在移动，还是时间戳在移动。",
        next: "noise",
        effect: { stat: "观察", amount: 3 },
      },
    ],
  },
  noise: {
    id: "noise",
    sender: "17 层 · 环境传感器",
    role: "system",
    time: "02:24",
    content: "录音捕捉到电梯到达音。可同一秒，E2 电梯的实时位置显示在 1 层。",
    detail: "声音不是回声。频谱里还藏着一段倒序播报：“记录早于事件。”",
    clueId: "floor-noise",
    choices: [
      {
        id: "compare",
        text: "对齐全部记录",
        reply: "以事件发生顺序，而不是系统时间，重新对齐证据。",
        next: "reasoning",
        effect: { stat: "推理", amount: 4 },
      },
      {
        id: "anonymous",
        text: "再回复匿名号码",
        reply: "你发来的不是预警，是已经发生过的记录，对吗？",
        next: "reasoning",
        effect: { flag: "repliedAnonymous", stat: "胆量", amount: 4 },
      },
    ],
  },
};

export const reasoningOptions = [
  { id: "camera", label: "A", text: "监控被篡改" },
  { id: "property", label: "B", text: "物业记录被篡改" },
  { id: "location", label: "C", text: "手机定位被伪造" },
  {
    id: "all-true",
    label: "D",
    text: "三者都是真的，但来自不同时间线",
  },
] as const;

export const caseMeta = {
  id: "CASE-WH-0217",
  title: "凌晨 2:17 的未读消息",
  location: "白港市 · 旧港区 · 雾灯公馆",
  status: "未公开异常事件",
};
