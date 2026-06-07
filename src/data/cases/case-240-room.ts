export type Room240Evidence = {
  kind: "image" | "audio" | "document";
  title: string;
  timestamp: string;
  location: string;
  description: string;
  duration?: string;
  transcript?: string;
  backgroundSound?: string;
};

export type Room240Clue = {
  id: string;
  title: string;
  type:
    | "语音线索"
    | "图片线索"
    | "数字线索"
    | "实体证据"
    | "封存档案"
    | "NPC线索"
    | "环境线索"
    | "档案线索";
  content: string;
  source: string;
  relatedFacts: string[];
  importance: number;
  credibility: number;
  critical?: boolean;
  evidence?: Room240Evidence;
};

export type Room240Choice = {
  id: string;
  label: string;
  result: string;
  nextSceneId: string;
  addFlags?: string[];
  requiresClueIds?: string[];
  excludesClueIds?: string[];
  requiresVisitedSceneIds?: string[];
};

export type Room240ConditionalText = {
  text: string;
  requiresClueIds?: string[];
  excludesClueIds?: string[];
  requiresVisitedSceneIds?: string[];
};

export type Room240Scene = {
  id: string;
  chapter: string;
  title: string;
  uiType: "chat" | "search" | "call" | "location" | "evidence" | "reveal" | "ending";
  time: string;
  location: string;
  kicker: string;
  paragraphs: string[];
  conditionalParagraphs?: Room240ConditionalText[];
  messages?: Array<{
    sender: string;
    role: "incoming" | "player" | "system";
    text: string;
    meta?: string;
    withdrawn?: boolean;
  }>;
  recordLines?: string[];
  evidenceClueIds?: string[];
  gainedClueIds?: string[];
  conditionalGainedClues?: Array<{
    clueId: string;
    requiresClueIds?: string[];
    excludesClueIds?: string[];
    requiresVisitedSceneIds?: string[];
  }>;
  truthReward?: number;
  hiddenTruthReward?: number;
  contradiction?: {
    id: string;
    text: string;
  };
  reveal?: string;
  endingCap?: "B";
  choices: Room240Choice[];
};

export type Room240Ending = {
  id: "ENDING_S" | "ENDING_A_PLUS" | "ENDING_A" | "ENDING_B" | "ENDING_C" | "ENDING_D";
  rank: "S" | "A+" | "A" | "B" | "C" | "D";
  title: string;
  conclusion: string;
  unlocks: string[];
  archiveIds: string[];
  contacts: string[];
  darklineContactGain?: number;
};

export const caseMeta = {
  caseId: "CASE_D_0007",
  archiveId: "D-0007",
  slug: "case-240-room",
  title: "240号房间",
  level: "D",
  district: "大学城",
  location: "白港市 · 大学城 · 白塔公寓",
  duration: "约 10 分钟",
  status: "调查中",
  openingTime: "02:13",
  template: "失踪事件 / 不存在的房间",
};

export const truthTree = {
  truth: "失踪学生主动进入24-0。",
  hiddenTruth: "24-0不是普通房间，而是三年前被封闭的数据地址节点。",
  deeperHiddenTruth: "三年前第一位失踪者顾晨持续出现在白港市监控中，但年龄没有变化。",
  facts: [
    { id: "F001", content: "玩家收到异常短信，内容指向“240号房”。" },
    { id: "F002", content: "白塔公寓公开房号系统不存在240号房。" },
    { id: "F003", content: "物业系统三年前存在测试房号240，后被注销。" },
    { id: "F004", content: "失踪学生昨晚23:57出现在24层电梯口。" },
    { id: "F005", content: "24层尽头墙面曾经存在被覆盖的标识。" },
    { id: "F006", content: "所谓240实际是“24-0”。" },
    { id: "F007", content: "24-0是三年前空间导航/地址映射实验的测试空间。" },
    { id: "F008", content: "三年前第一位学生顾晨进入24-0后失踪。" },
    { id: "F009", content: "本案失踪学生是主动进入24-0。" },
    { id: "F010", content: "观察局封锁过24-0相关记录。" },
    { id: "F011", content: "顾晨三年来持续出现在不同监控画面中，年龄不变。" },
  ],
};

export const npcs = [
  {
    id: "NPC_001",
    name: "林知远",
    identity: "白塔公寓夜班保安",
    function: "目击者 / 隐瞒者",
    credibility: 62,
    secret: "删除过凌晨2:13相关录像。",
    knownFacts: ["F004", "F005", "F010"],
  },
  {
    id: "NPC_002",
    name: "赵宏",
    identity: "白塔公寓物业管理员",
    function: "嫌疑人 / 隐瞒者",
    credibility: 35,
    secret: "三年前批准封闭24-0测试空间，并删除公开记录。",
    knownFacts: ["F003", "F006", "F007", "F008", "F010"],
  },
  {
    id: "NPC_003",
    name: "沈岚",
    identity: "前白港数据中心工程师",
    function: "连接者 / 主线NPC",
    credibility: 78,
    secret: "参与过三年前地址映射实验，知道观察局接管了24-0。",
    knownFacts: ["F006", "F007", "F008", "F009", "F010", "F011"],
  },
  {
    id: "NPC_004",
    name: "顾晨",
    identity: "三年前第一位失踪学生",
    function: "隐藏真相钩子",
    credibility: 0,
    secret: "失踪后持续出现在监控中，年龄不变。",
    knownFacts: ["F008", "F011"],
  },
  {
    id: "NPC_005",
    name: "当前失踪学生",
    identity: "白港大学学生",
    function: "表面受害者 / 实际主动调查者",
    credibility: 68,
    secret: "主动进入24-0。",
    knownFacts: ["F004", "F006", "F009"],
  },
];

const audioEvidence = (
  title: string,
  timestamp: string,
  location: string,
  duration: string,
  transcript: string,
  backgroundSound: string,
  description: string,
): Room240Evidence => ({
  kind: "audio",
  title,
  timestamp,
  location,
  duration,
  transcript,
  backgroundSound,
  description,
});

const visualEvidence = (
  kind: "image" | "document",
  title: string,
  timestamp: string,
  location: string,
  description: string,
): Room240Evidence => ({ kind, title, timestamp, location, description });

export const clues: Room240Clue[] = [
  {
    id: "CLUE_001",
    title: "7秒语音",
    type: "语音线索",
    content: "“别相信保安……他删过录像……”",
    source: "陌生号码",
    relatedFacts: ["F001", "F004"],
    importance: 70,
    credibility: 65,
    critical: true,
    evidence: audioEvidence(
      "匿名语音留言",
      "02:14:07",
      "未知",
      "00:07",
      "别相信保安……他删过录像……",
      "电梯到站提示音、轻微电流干扰",
      "语音在第5秒出现明显压缩断层，发送端可能处于信号屏蔽区。",
    ),
  },
  {
    id: "CLUE_002",
    title: "测试房号240",
    type: "数字线索",
    content: "三年前物业系统曾存在测试房号240，后被注销，负责人赵宏。",
    source: "白塔公寓物业系统缓存",
    relatedFacts: ["F002", "F003"],
    importance: 70,
    credibility: 75,
    critical: true,
    evidence: visualEvidence(
      "document",
      "房号维护记录 / 240",
      "三年前 09:40",
      "白塔公寓物业系统",
      "测试房号240，状态已注销。审批与后续维护负责人均为赵宏。",
    ),
  },
  {
    id: "CLUE_003",
    title: "23:57监控截图",
    type: "图片线索",
    content: "昨晚23:57，失踪学生出现在24层电梯口。",
    source: "匿名邮件附件",
    relatedFacts: ["F004"],
    importance: 75,
    credibility: 80,
    critical: true,
    evidence: visualEvidence(
      "image",
      "24层电梯厅监控截图",
      "昨晚 23:57:18",
      "白塔公寓 · 24层电梯口",
      "失踪学生独自走出电梯，手里拿着一张折叠结构图，视线朝走廊尽头。",
    ),
  },
  {
    id: "CLUE_004",
    title: "被删除的旧帖",
    type: "数字线索",
    content: "三年前有人发帖称电梯停在“240”，帖子随后被删除。",
    source: "白港大学旧论坛网页缓存",
    relatedFacts: ["F003", "F006"],
    importance: 60,
    credibility: 60,
  },
  {
    id: "CLUE_005",
    title: "电话背景录音",
    type: "语音线索",
    content: "“观察局已经知道了。”",
    source: "与赵宏的通话录音",
    relatedFacts: ["F010"],
    importance: 80,
    credibility: 70,
    critical: true,
    evidence: audioEvidence(
      "物业电话背景声",
      "02:27:31",
      "赵宏办公室",
      "00:04",
      "……观察局已经知道了。",
      "纸张摩擦、第二名成年人的低声提醒",
      "赵宏并非独自在办公室，第二个声音刻意远离听筒。",
    ),
  },
  {
    id: "CLUE_006",
    title: "消防门旁照片",
    type: "图片线索",
    content: "失踪学生站在消防门旁，背后有模糊数字240。",
    source: "匿名邮件附件",
    relatedFacts: ["F004", "F005", "F006"],
    importance: 75,
    credibility: 75,
    critical: true,
    evidence: visualEvidence(
      "image",
      "24层消防门照片",
      "昨晚 23:59",
      "白塔公寓 · 24层走廊尽头",
      "失踪学生站在消防门旁。背后的墙面反光中，能辨认出被覆盖的“240”。",
    ),
  },
  {
    id: "CLUE_007",
    title: "墙面旧标识",
    type: "实体证据",
    content: "24层尽头曾存在房号标识，侧光下残留“24_”轮廓。",
    source: "24层现场调查",
    relatedFacts: ["F005", "F006"],
    importance: 75,
    credibility: 80,
    critical: true,
    evidence: visualEvidence(
      "image",
      "重新粉刷的墙面",
      "02:39",
      "白塔公寓 · 24层走廊尽头",
      "冷光从侧面扫过墙面，新漆下浮出旧金属牌留下的“24_”压痕。",
    ),
  },
  {
    id: "CLUE_008",
    title: "WH-24-0黑色文件袋",
    type: "实体证据",
    content: "24-0不是房号，而是被封闭的测试空间。",
    source: "24层消防通道楼梯平台",
    relatedFacts: ["F006", "F007", "F010"],
    importance: 95,
    credibility: 90,
    critical: true,
    evidence: visualEvidence(
      "document",
      "WH-24-0 / 黑色文件袋",
      "三年前封存",
      "白塔公寓 · 消防通道",
      "结构图显示2404之后存在“24-0测试空间”；封闭申请批准人为赵宏。",
    ),
  },
  {
    id: "CLUE_009",
    title: "WH-D-118档案",
    type: "封存档案",
    content: "三年前第一位失踪者顾晨进入24-0后消失。",
    source: "赵宏办公室本地终端",
    relatedFacts: ["F007", "F008"],
    importance: 95,
    credibility: 90,
    critical: true,
    evidence: visualEvidence(
      "document",
      "WH-D-118 / 地址映射实验事故",
      "三年前 · 第63天",
      "白塔公寓 · 24-0测试空间",
      "白塔公寓与北星数据集团进行空间导航测试。学生顾晨进入测试空间后失踪。",
    ),
  },
  {
    id: "CLUE_010",
    title: "WH-A-024封存片段",
    type: "封存档案",
    content: "顾晨三年来持续出现在监控中，年龄没有变化。",
    source: "沈岚持有的封存档案",
    relatedFacts: ["F011"],
    importance: 100,
    credibility: 90,
    critical: true,
    evidence: visualEvidence(
      "image",
      "顾晨跨年监控拼图",
      "三年间 / 四次记录",
      "海湾区、旧城区、工业港、白港大学",
      "四张来自不同年份的监控截图里，顾晨的外貌、衣着尺寸与面部年龄完全一致。",
    ),
  },
  {
    id: "CLUE_A01",
    title: "异常号码",
    type: "数字线索",
    content: "陌生号码不存在正常注册记录，但确实向玩家发送了短信。",
    source: "白港通讯号码查询",
    relatedFacts: ["F001"],
    importance: 35,
    credibility: 60,
  },
  {
    id: "CLUE_A01B",
    title: "旧通讯网关",
    type: "数字线索",
    content: "短信通过WH-GATE-24旧网关发送。",
    source: "旧通讯路由记录",
    relatedFacts: ["F001"],
    importance: 45,
    credibility: 65,
  },
  {
    id: "CLUE_A02",
    title: "电梯背景音",
    type: "语音线索",
    content: "语音背景音疑似来自白塔公寓旧电梯。",
    source: "本地音频频谱分析",
    relatedFacts: ["F004"],
    importance: 55,
    credibility: 70,
    evidence: audioEvidence(
      "7秒语音频谱",
      "02:15",
      "疑似白塔公寓内部",
      "00:07",
      "别相信保安……他删过录像……",
      "旧式电梯到站音、雨声、金属门开合声",
      "到站提示音与白塔公寓仍在使用的旧电梯型号一致。",
    ),
  },
  {
    id: "CLUE_A03",
    title: "保安监控投诉记录",
    type: "数字线索",
    content: "林知远三年前曾被投诉擅自处理监控备份。",
    source: "白塔公寓夜班值班档案",
    relatedFacts: ["F010"],
    importance: 65,
    credibility: 70,
    critical: true,
  },
  {
    id: "CLUE_A04",
    title: "走廊尽头反光",
    type: "图片线索",
    content: "监控截图显示24层尽头可能存在被遮挡标识。",
    source: "CLUE_003局部放大",
    relatedFacts: ["F005"],
    importance: 60,
    credibility: 65,
    evidence: visualEvidence(
      "image",
      "截图局部放大 / 24_",
      "昨晚 23:57:18",
      "白塔公寓 · 24层走廊",
      "消防门旁的反光区域出现“24_”轮廓，最后一位无法辨认。",
    ),
  },
  {
    id: "CLUE_A05",
    title: "不完整的监控",
    type: "数字线索",
    content: "匿名邮件提示监控截图可能缺失关键部分。",
    source: "匿名邮件回复",
    relatedFacts: ["F010"],
    importance: 55,
    credibility: 60,
  },
  {
    id: "CLUE_A06",
    title: "测试数据回避",
    type: "NPC线索",
    content: "赵宏拒绝解释240测试数据的具体用途。",
    source: "与赵宏的通话",
    relatedFacts: ["F003"],
    importance: 50,
    credibility: 55,
  },
  {
    id: "CLUE_A07",
    title: "空间导航测试",
    type: "数字线索",
    content: "赵宏三年前参与过白塔公寓空间导航测试项目。",
    source: "北星数据集团公开项目档案",
    relatedFacts: ["F007"],
    importance: 70,
    credibility: 75,
    critical: true,
  },
  {
    id: "CLUE_A08",
    title: "消防门后的声音",
    type: "环境线索",
    content: "24层消防门后出现异常金属拖动声。",
    source: "24层现场调查",
    relatedFacts: ["F006"],
    importance: 55,
    credibility: 65,
  },
  {
    id: "CLUE_A09",
    title: "保安承认处理录像",
    type: "NPC线索",
    content: "林知远承认处理过录像，并称是赵宏要求。",
    source: "林知远的口供",
    relatedFacts: ["F010"],
    importance: 75,
    credibility: 70,
    critical: true,
  },
  {
    id: "CLUE_A10",
    title: "24层信号异常",
    type: "环境线索",
    content: "24层尽头附近出现信号衰减和方向偏移。",
    source: "玩家手机传感器",
    relatedFacts: ["F006"],
    importance: 60,
    credibility: 60,
  },
  {
    id: "CLUE_A11",
    title: "保安的停顿",
    type: "NPC线索",
    content: "林知远听到240时出现明显异常反应。",
    source: "大厅询问",
    relatedFacts: ["F002"],
    importance: 40,
    credibility: 55,
  },
  {
    id: "CLUE_A12",
    title: "过快否认",
    type: "NPC线索",
    content: "林知远可能认识失踪学生，但快速否认。",
    source: "大厅询问",
    relatedFacts: ["F004"],
    importance: 45,
    credibility: 50,
  },
  {
    id: "CLUE_A13",
    title: "24层监控离线",
    type: "数字线索",
    content: "24层监控在23:57离线。",
    source: "保安值班屏幕",
    relatedFacts: ["F004"],
    importance: 65,
    credibility: 70,
    critical: true,
  },
  {
    id: "CLUE_A14",
    title: "删录像指控",
    type: "NPC线索",
    content: "林知远听到删录像后出现慌乱。",
    source: "大厅对话",
    relatedFacts: ["F004"],
    importance: 50,
    credibility: 60,
  },
  {
    id: "CLUE_A15",
    title: "推给保安",
    type: "NPC线索",
    content: "赵宏把23:57的线索推给林知远。",
    source: "与赵宏的通话",
    relatedFacts: ["F004"],
    importance: 45,
    credibility: 55,
  },
  {
    id: "CLUE_A16",
    title: "地址映射缓存",
    type: "数字线索",
    content: "北星数据集团项目缓存中出现“地址映射”字样。",
    source: "北星数据集团网页缓存",
    relatedFacts: ["F007"],
    importance: 80,
    credibility: 65,
    critical: true,
  },
  {
    id: "CLUE_A17",
    title: "手动删除记录",
    type: "数字线索",
    content: "24层监控在导出后被手动删除。",
    source: "白塔公寓监控室日志",
    relatedFacts: ["F010"],
    importance: 85,
    credibility: 80,
    critical: true,
  },
  {
    id: "CLUE_A18",
    title: "同步失败广播",
    type: "语音线索",
    content: "消防门后传来“地址同步失败”的异常广播。",
    source: "24层消防门后",
    relatedFacts: ["F007"],
    importance: 80,
    credibility: 60,
    critical: true,
    evidence: audioEvidence(
      "门后异常广播",
      "02:40",
      "白塔公寓 · 24层尽头",
      "00:05",
      "……地址……同步失败……",
      "持续电流声、金属共振",
      "广播频段不属于公寓消防系统，关键词指向地址映射实验。",
    ),
  },
  {
    id: "CLUE_A19",
    title: "墙面取证照片",
    type: "图片线索",
    content: "墙面色差证明此处曾安装标识牌。",
    source: "现场拍照与图像比对",
    relatedFacts: ["F005"],
    importance: 65,
    credibility: 75,
    critical: true,
    evidence: visualEvidence(
      "image",
      "墙面色差取证",
      "02:40",
      "白塔公寓 · 24层尽头",
      "图像识别确认此处曾安装20cm × 8cm金属标识牌。",
    ),
  },
  {
    id: "CLUE_A20",
    title: "外包封墙",
    type: "NPC线索",
    content: "林知远称赵宏曾找外包处理24层尽头墙面。",
    source: "林知远的口供",
    relatedFacts: ["F005"],
    importance: 60,
    credibility: 60,
  },
  {
    id: "CLUE_A21",
    title: "沈岚的判断",
    type: "NPC线索",
    content: "沈岚确认24-0不是普通地点。",
    source: "沈岚",
    relatedFacts: ["F007"],
    importance: 70,
    credibility: 75,
    critical: true,
  },
  {
    id: "CLUE_A22",
    title: "观察局关键词",
    type: "数字线索",
    content: "提到观察局后，赵宏电脑远程连接被中断。",
    source: "赵宏办公室终端",
    relatedFacts: ["F010"],
    importance: 85,
    credibility: 70,
    critical: true,
  },
  {
    id: "CLUE_A23",
    title: "顾晨档案",
    type: "档案线索",
    content: "顾晨三年前通过匿名导航链接进入24-0后失踪。",
    source: "WH-D-118完整档案",
    relatedFacts: ["F008"],
    importance: 90,
    credibility: 85,
    critical: true,
    evidence: visualEvidence(
      "document",
      "顾晨失踪记录",
      "三年前 · 第63天",
      "白港大学 / 白塔公寓",
      "顾晨连续三晚收到标题为“你要找的房间在24-0”的匿名导航链接。",
    ),
  },
  {
    id: "CLUE_A24",
    title: "三帧监控",
    type: "图片线索",
    content: "顾晨三年来出现在多个地点，年龄没有变化。",
    source: "WH-A-024权限拦截页",
    relatedFacts: ["F011"],
    importance: 95,
    credibility: 75,
    critical: true,
    evidence: visualEvidence(
      "image",
      "WH-A-024三帧监控",
      "三年间",
      "海湾区地铁站、旧城区钟楼、白港大学图书馆",
      "权限页面闪现三帧监控，同一个人的年龄和外貌没有变化。",
    ),
  },
];

const choice = (
  id: string,
  label: string,
  result: string,
  nextSceneId: string,
  extras: Partial<Room240Choice> = {},
): Room240Choice => ({ id, label, result, nextSceneId, ...extras });

const baseScene = (
  scene: Omit<Room240Scene, "choices"> & { choices?: Room240Choice[] },
): Room240Scene => ({ ...scene, choices: scene.choices ?? [] });

export const scenes: Room240Scene[] = [
  baseScene({
    id: "SCENE_001",
    chapter: "异常接触",
    title: "已撤回的短信",
    uiType: "chat",
    time: "02:13",
    location: "你的住处",
    kicker: "陌生号码 / 无联系人记录",
    paragraphs: ["手机在枕边震了一下。屏幕只亮了三秒，那句话就被撤回。"],
    messages: [
      { sender: "未知号码", role: "incoming", text: "不要来240号房。", meta: "02:13" },
      { sender: "系统", role: "system", text: "消息已撤回", withdrawn: true },
    ],
    truthReward: 5,
    choices: [
      choice("SCENE_001_A", "查询电话号码", "你把号码复制进白港通讯查询页。", "SCENE_001A"),
      choice("SCENE_001_B", "搜索240号房", "你直接搜索“白塔公寓 240号房”。", "SCENE_001B"),
      choice("SCENE_001_C", "直接前往白塔公寓", "你没有继续查资料，直接叫车。", "SCENE_001C"),
      choice("SCENE_001_D", "回复短信", "你输入：你是谁？", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_001A",
    chapter: "号码调查",
    title: "异常号码",
    uiType: "search",
    time: "02:15",
    location: "白港通讯查询页",
    kicker: "号码状态 / 不存在",
    paragraphs: [
      "号码状态：不存在。归属地：白港市。注册时间：昨天23:41。运营商记录：空。",
      "你尝试回拨，听筒里只有机械提示：您拨打的号码不存在。",
      "这个号码可以发送短信，却无法被回拨，也没有正常注册记录。",
    ],
    recordLines: [
      "号码状态 / 不存在",
      "归属地 / 白港市",
      "注册时间 / 昨天 23:41",
      "运营商记录 / 空",
      "回拨结果 / 您拨打的号码不存在",
    ],
    gainedClueIds: ["CLUE_A01"],
    truthReward: 5,
    choices: [
      choice("SCENE_001A_A", "分析号码记录", "你继续追查短信的发送节点。", "SCENE_001A_1"),
      choice("SCENE_001A_B", "搜索白塔公寓", "你把调查转向短信中的地点。", "SCENE_003"),
      choice("SCENE_001A_C", "直接前往白塔公寓", "你保留查询页，直接出门。", "SCENE_001C"),
      choice("SCENE_001A_D", "回复短信", "你向无法回拨的号码发出回复。", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_001A_1",
    chapter: "号码调查",
    title: "旧通讯网关",
    uiType: "search",
    time: "02:17",
    location: "白港旧通讯路由缓存",
    kicker: "WH-GATE-24 / 退役节点",
    paragraphs: [
      "发送节点并不是普通基站，而是来自白港市旧通讯网关。",
      "网关备注：WH-GATE-24。",
      "“24”再次出现。这个号码像是从一段已经停用的城市基础设施里发出来的。",
    ],
    recordLines: ["发送节点 / WH-GATE-24", "节点类型 / 旧通讯网关", "服役状态 / 已退役"],
    gainedClueIds: ["CLUE_A01B"],
    hiddenTruthReward: 5,
    choices: [
      choice("SCENE_001A_1_A", "搜索240号房", "你开始检索白塔公寓公开房号。", "SCENE_003"),
      choice("SCENE_001A_1_B", "前往白塔公寓", "旧网关与公寓都指向24。", "SCENE_001C"),
      choice("SCENE_001A_1_C", "回复短信", "你问对方是否在白塔公寓。", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_001B",
    chapter: "公开记录",
    title: "不存在的房号",
    uiType: "search",
    time: "02:18",
    location: "白港城市服务网",
    kicker: "房号查询 / 记录冲突",
    paragraphs: [
      "白塔公寓24层房号只有2401、2402、2403、2404。没有240号房。",
      "继续搜索历史缓存，你找到三年前的维修记录：测试房号240，状态已注销，负责人赵宏。",
    ],
    recordLines: ["2401", "2402", "2403", "2404", "240 / 测试房号 / 已注销 / 负责人：赵宏"],
    evidenceClueIds: ["CLUE_002"],
    gainedClueIds: ["CLUE_002"],
    truthReward: 10,
    contradiction: {
      id: "CONTRADICTION_ROOM_NUMBER",
      text: "短信提到240号房，但白塔公寓公开房号不存在240。",
    },
    choices: [
      choice("SCENE_001B_A", "查询赵宏", "你拨通物业管理员赵宏的夜间电话。", "SCENE_004"),
      choice("SCENE_001B_B", "查看历史论坛", "你打开三年前的论坛网页缓存。", "SCENE_004_FORUM"),
      choice("SCENE_001B_C", "前往白塔公寓", "你带着维修记录赶往现场。", "SCENE_001C"),
      choice("SCENE_001B_D", "回复短信", "你问对方240为什么不在房号表里。", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_001C",
    chapter: "现场入口",
    title: "凌晨的白塔公寓",
    uiType: "location",
    time: "02:47",
    location: "白塔公寓 · 一层大厅",
    kicker: "夜班保安 / 林知远",
    paragraphs: [
      "白塔公寓大厅灯光昏暗。夜班保安抬头看向你，胸牌写着：林知远。",
      "“这么晚，你找谁？”",
    ],
    conditionalParagraphs: [
      {
        requiresClueIds: ["CLUE_001"],
        text: "你提到“有人说你删过录像”。林知远反问：“谁说的？”他的语气第一次出现慌乱。",
      },
    ],
    gainedClueIds: [],
    choices: [
      choice("SCENE_001C_A", "打听240号房", "林知远的视线短暂偏向电梯。", "SCENE_001C_1"),
      choice("SCENE_001C_B", "打听失踪学生", "你描述昨晚出现在24层的学生。", "SCENE_001C_2"),
      choice("SCENE_001C_C", "要求查看监控", "林知远挡住了值班屏幕。", "SCENE_001C_3"),
      choice("SCENE_001C_D", "坐电梯去24层", "你绕过询问，直接按下24层。", "SCENE_006"),
    ],
  }),
  baseScene({
    id: "SCENE_001C_1",
    chapter: "现场入口",
    title: "保安的停顿",
    uiType: "call",
    time: "02:48",
    location: "白塔公寓 · 一层大厅",
    kicker: "NPC反应 / 240",
    paragraphs: [
      "林知远明显停顿了一下。",
      "“这里没有240。”",
      "他说话时，眼神却看向电梯方向。",
    ],
    gainedClueIds: ["CLUE_A11"],
    choices: [
      choice("SCENE_001C_1_A", "继续追问", "你要求他拿监控证明。", "SCENE_001C_3"),
      choice("SCENE_001C_1_B", "去24层", "你不再等他的解释。", "SCENE_006"),
      choice("SCENE_001C_1_C", "要求查看监控", "你顺着他的视线走回保安台。", "SCENE_001C_3"),
    ],
  }),
  baseScene({
    id: "SCENE_001C_2",
    chapter: "现场入口",
    title: "过快否认",
    uiType: "call",
    time: "02:49",
    location: "白塔公寓 · 一层大厅",
    kicker: "NPC反应 / 失踪学生",
    paragraphs: [
      "“学生？这栋楼学生很多。”",
      "你描述监控截图中的人。林知远立刻回答：“没见过。”",
      "他回答得太快，快得像提前准备过。",
    ],
    gainedClueIds: ["CLUE_A12"],
    choices: [
      choice("SCENE_001C_2_A", "要求查看监控", "你把话题转向昨晚23:57。", "SCENE_001C_3"),
      choice("SCENE_001C_2_B", "去24层", "你决定到学生最后出现的位置确认。", "SCENE_006"),
    ],
  }),
  baseScene({
    id: "SCENE_001C_3",
    chapter: "现场入口",
    title: "正在维护的监控",
    uiType: "evidence",
    time: "02:51",
    location: "白塔公寓 · 保安台",
    kicker: "值班日志 / CAMERA OFFLINE",
    paragraphs: [
      "林知远拒绝：“监控系统正在维护。”",
      "他伸手关屏前，你看到右下角有一条日志：23:57 24F CAMERA OFFLINE。",
    ],
    conditionalParagraphs: [
      {
        requiresClueIds: ["CLUE_001"],
        text: "你再次提到删录像的语音。林知远的手停在电源键上，脸色明显变了。",
      },
    ],
    recordLines: ["23:57 / 24F CAMERA OFFLINE", "维护工单 / 未找到"],
    gainedClueIds: ["CLUE_A13"],
    conditionalGainedClues: [
      {
        clueId: "CLUE_A14",
        requiresClueIds: ["CLUE_001"],
      },
    ],
    truthReward: 10,
    contradiction: {
      id: "CONTRADICTION_CAMERA_MAINTENANCE",
      text: "保安称系统维护，但值班日志只显示24层在学生出现时离线。",
    },
    choices: [
      choice("SCENE_001C_3_A", "去24层", "你记下日志时间，走向电梯。", "SCENE_006"),
      choice("SCENE_001C_3_B", "查询赵宏", "你当着林知远的面拨通赵宏。", "SCENE_004"),
      choice("SCENE_001C_3_C", "回复短信", "你告诉陌生号码：保安确实在隐瞒。", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_002",
    chapter: "异常接触",
    title: "7秒语音",
    uiType: "chat",
    time: "02:14",
    location: "你的手机",
    kicker: "语音留言 / 00:07",
    paragraphs: ["你发出“你是谁？”。对方没有回答，只回了一段七秒语音。"],
    messages: [
      { sender: "你", role: "player", text: "你是谁？", meta: "02:14" },
      { sender: "未知号码", role: "incoming", text: "语音消息 · 7秒", meta: "刚刚" },
    ],
    evidenceClueIds: ["CLUE_001"],
    gainedClueIds: ["CLUE_001"],
    truthReward: 7,
    hiddenTruthReward: 2,
    choices: [
      choice("SCENE_002_A", "分析语音背景音", "你戴上耳机反复播放录音。", "SCENE_002A"),
      choice("SCENE_002_B", "搜索白塔公寓资料", "你开始核对白塔公寓房号。", "SCENE_003"),
      choice("SCENE_002_C", "前往白塔公寓", "你带着语音直接去找林知远。", "SCENE_001C"),
      choice("SCENE_002_D", "查询夜班保安资料", "你打开物业值班表。", "SCENE_002D"),
    ],
  }),
  baseScene({
    id: "SCENE_002A",
    chapter: "语音分析",
    title: "7秒语音",
    uiType: "evidence",
    time: "02:17",
    location: "本地音频分析器",
    kicker: "频谱增强 / 环境匹配",
    paragraphs: [
      "除了男声，还能听见电梯到站提示音、雨声和金属门开合声。",
      "系统比对白塔公寓公开视频：背景里的提示音与那栋楼仍在使用的旧电梯型号一致。",
      "语音极可能在白塔公寓内部录制。",
    ],
    evidenceClueIds: ["CLUE_A02"],
    gainedClueIds: ["CLUE_A02"],
    truthReward: 8,
    choices: [
      choice("SCENE_002A_A", "搜索白塔公寓资料", "你从声音定位转向公开记录。", "SCENE_003"),
      choice("SCENE_002A_B", "前往白塔公寓", "电梯声音已经给出方向。", "SCENE_001C"),
      choice("SCENE_002A_C", "查询夜班保安", "你查询今晚是谁在值班。", "SCENE_002D"),
    ],
  }),
  baseScene({
    id: "SCENE_002D",
    chapter: "人物调查",
    title: "林知远",
    uiType: "search",
    time: "02:20",
    location: "白塔公寓值班档案",
    kicker: "夜班值班表 / 历史投诉",
    paragraphs: [
      "今晚值班：林知远。",
      "三年前，他曾被投诉“擅自处理监控备份”。投诉结果一栏为空，没有处理记录。",
    ],
    recordLines: ["今晚值班 / 林知远", "历史投诉 / 擅自处理监控备份", "处理结果 / 无记录"],
    gainedClueIds: ["CLUE_A03"],
    truthReward: 10,
    choices: [
      choice("SCENE_002D_A", "前往白塔公寓", "你决定当面询问林知远。", "SCENE_001C"),
      choice("SCENE_002D_B", "查询赵宏", "投诉记录的审批人指向物业管理员。", "SCENE_004"),
      choice("SCENE_002D_C", "搜索白塔公寓资料", "你先核对房号与历史记录。", "SCENE_003"),
    ],
  }),
  baseScene({
    id: "SCENE_003",
    chapter: "公开记录",
    title: "白塔公寓资料",
    uiType: "search",
    time: "02:19",
    location: "白港城市服务网",
    kicker: "公开资料 / 匿名邮件",
    paragraphs: [
      "24层公开房号只有2401、2402、2403、2404。没有240号房。",
      "三年前的维修缓存里，确实存在测试房号240，状态已注销，负责人赵宏。",
      "匿名邮件同时抵达：昨晚23:57，失踪学生出现在24层电梯口。",
    ],
    recordLines: ["2401", "2402", "2403", "2404", "240 / 测试房号 / 已注销 / 负责人：赵宏"],
    evidenceClueIds: ["CLUE_002", "CLUE_003"],
    gainedClueIds: ["CLUE_002", "CLUE_003"],
    truthReward: 17,
    hiddenTruthReward: 6,
    contradiction: {
      id: "CONTRADICTION_ROOM_NUMBER",
      text: "公开房号不存在240，但物业历史系统曾维护过240。",
    },
    choices: [
      choice("SCENE_003_A", "查看监控截图细节", "你放大走廊尽头的反光。", "SCENE_003A"),
      choice("SCENE_003_B", "查询赵宏", "你拨通赵宏的夜间应急电话。", "SCENE_004"),
      choice("SCENE_003_C", "前往白塔公寓24层", "你保存截图，赶往学生最后出现的位置。", "SCENE_006"),
      choice("SCENE_003_D", "回复匿名邮件", "你问发件人到底是谁。", "SCENE_003D"),
    ],
  }),
  baseScene({
    id: "SCENE_003A",
    chapter: "图片分析",
    title: "截图放大",
    uiType: "evidence",
    time: "02:22",
    location: "匿名邮件附件",
    kicker: "图像增强 / 走廊尽头",
    paragraphs: [
      "失踪学生没有看向镜头，而是看向走廊尽头。",
      "截图边缘有一小块反光，像是消防门旁边的金属牌。",
      "放大后只能看清：24_。",
    ],
    evidenceClueIds: ["CLUE_A04"],
    gainedClueIds: ["CLUE_A04"],
    truthReward: 10,
    choices: [
      choice("SCENE_003A_A", "前往24层", "你要在现场确认那块反光。", "SCENE_006"),
      choice("SCENE_003A_B", "查询赵宏", "被覆盖的标识需要物业解释。", "SCENE_004"),
      choice("SCENE_003A_C", "回复匿名邮件", "你把“24_”发回给匿名发件人。", "SCENE_003D"),
    ],
  }),
  baseScene({
    id: "SCENE_003D",
    chapter: "匿名通讯",
    title: "不完整的监控",
    uiType: "chat",
    time: "02:23",
    location: "匿名邮件",
    kicker: "发件人 / 无法追踪",
    paragraphs: ["你回复：“你是谁？”对方只发回三句话。"],
    messages: [
      { sender: "匿名发件人", role: "incoming", text: "不要相信监控。", meta: "02:23" },
      { sender: "匿名发件人", role: "incoming", text: "截图是真的。", meta: "02:23" },
      { sender: "匿名发件人", role: "incoming", text: "但你看到的不完整。", meta: "02:24" },
    ],
    gainedClueIds: ["CLUE_A05"],
    hiddenTruthReward: 5,
    choices: [
      choice("SCENE_003D_A", "查看截图细节", "你重新检查画面边缘。", "SCENE_003A"),
      choice("SCENE_003D_B", "查询赵宏", "你需要知道谁能动物业记录。", "SCENE_004"),
      choice("SCENE_003D_C", "前往白塔公寓", "你不再依赖远程信息。", "SCENE_006"),
    ],
  }),
  baseScene({
    id: "SCENE_004_FORUM",
    chapter: "历史记录",
    title: "被删除的楼层",
    uiType: "search",
    time: "02:24",
    location: "白港大学旧论坛缓存",
    kicker: "三年前 / 已删除帖子",
    paragraphs: [
      "三年前，有学生发帖说电梯在24层之后显示“240”。",
      "帖子发布十分钟后被删除，账号也停止活动。",
    ],
    recordLines: ["标题 / 电梯刚才停在240", "发布时间 / 三年前 02:13", "状态 / 已删除"],
    gainedClueIds: ["CLUE_004"],
    truthReward: 6,
    hiddenTruthReward: 3,
    choices: [
      choice("SCENE_004_FORUM_A", "查询赵宏", "维修记录与删帖时间都指向三年前。", "SCENE_004"),
      choice("SCENE_004_FORUM_B", "前往白塔公寓", "你决定亲自验证电梯与24层。", "SCENE_006"),
      choice("SCENE_004_FORUM_C", "回复陌生短信", "你问对方是否看过这条旧帖。", "SCENE_002"),
    ],
  }),
  baseScene({
    id: "SCENE_004",
    chapter: "人物调查",
    title: "赵宏的否认",
    uiType: "call",
    time: "02:24",
    location: "物业应急电话",
    kicker: "通话中 / 赵宏",
    paragraphs: [
      "赵宏先说白塔公寓从来没有240号房。",
      "你念出维修记录编号。他沉默两秒，改口称那只是一次已经注销的测试数据。",
      "旧论坛缓存同时恢复：三年前，有人说电梯曾停在“240”。",
    ],
    messages: [
      { sender: "赵宏", role: "incoming", text: "没有240。你查到的只是测试数据。", meta: "通话中" },
      { sender: "系统", role: "system", text: "已恢复删除缓存：电梯刚才停在240。" },
    ],
    gainedClueIds: ["CLUE_004"],
    truthReward: 9,
    hiddenTruthReward: 5,
    choices: [
      choice("SCENE_004_A", "追问240是什么", "你要求他解释所谓测试数据。", "SCENE_004A"),
      choice("SCENE_004_B", "追问失踪学生", "你报出23:57和24层。", "SCENE_004B"),
      choice("SCENE_004_C", "追问为什么紧张", "电话另一端突然安静下来。", "SCENE_005"),
      choice("SCENE_004_D", "调查赵宏背景", "你挂断电话，检索他的项目履历。", "SCENE_004D"),
    ],
  }),
  baseScene({
    id: "SCENE_004A",
    chapter: "人物调查",
    title: "测试数据回避",
    uiType: "call",
    time: "02:25",
    location: "物业应急电话",
    kicker: "赵宏 / 通话中断",
    paragraphs: [
      "“测试数据。”",
      "你追问：“测试什么？”",
      "赵宏沉默，然后直接挂断了电话。",
    ],
    gainedClueIds: ["CLUE_A06"],
    choices: [
      choice("SCENE_004A_A", "调查赵宏背景", "公开履历也许会替他回答。", "SCENE_004D"),
      choice("SCENE_004A_B", "前往白塔公寓", "你决定去现场找答案。", "SCENE_006"),
      choice("SCENE_004A_C", "回复匿名邮件", "你把赵宏的反应发给匿名人。", "SCENE_003D"),
    ],
  }),
  baseScene({
    id: "SCENE_004B",
    chapter: "人物调查",
    title: "推给保安",
    uiType: "call",
    time: "02:26",
    location: "物业应急电话",
    kicker: "23:57 / 24层",
    paragraphs: [
      "赵宏说：“不认识。”",
      "你描述23:57、24层和监控截图。他明显停顿。",
      "“那你应该问保安。”",
    ],
    gainedClueIds: ["CLUE_A15"],
    choices: [
      choice("SCENE_004B_A", "调查保安", "你查询今晚的值班表。", "SCENE_002D"),
      choice("SCENE_004B_B", "前往24层", "你去学生最后出现的位置。", "SCENE_006"),
      choice("SCENE_004B_C", "追问为什么紧张", "你没有让他把问题推走。", "SCENE_005"),
    ],
  }),
  baseScene({
    id: "SCENE_004D",
    chapter: "人物调查",
    title: "空间导航测试",
    uiType: "search",
    time: "02:27",
    location: "白港企业项目公示",
    kicker: "赵宏 / 北星数据集团",
    paragraphs: [
      "赵宏三年前参与过白塔公寓与北星数据集团的联合项目。",
      "项目公开名称：空间导航测试。项目状态：已终止。终止原因：未公开。",
    ],
    recordLines: ["项目 / 空间导航测试", "合作方 / 白塔公寓、北星数据集团", "状态 / 已终止"],
    gainedClueIds: ["CLUE_A07"],
    truthReward: 12,
    choices: [
      choice("SCENE_004D_A", "追问为什么紧张", "你带着项目名称重新拨通赵宏。", "SCENE_005"),
      choice("SCENE_004D_B", "前往白塔公寓", "你需要确认测试发生在哪。", "SCENE_006"),
      choice("SCENE_004D_C", "查询北星数据集团", "你继续查项目的技术缓存。", "SCENE_004D_1"),
    ],
  }),
  baseScene({
    id: "SCENE_004D_1",
    chapter: "企业记录",
    title: "地址映射缓存",
    uiType: "search",
    time: "02:30",
    location: "北星数据集团网页缓存",
    kicker: "地址映射 / 页面失效",
    paragraphs: [
      "北星数据集团三年前进行过室内定位、空间导航和地址映射相关试验。",
      "“地址映射”四个字在缓存页面出现过一次，随后页面加载失败。",
    ],
    recordLines: ["室内定位", "空间导航", "地址映射 / 缓存命中", "页面状态 / 加载失败"],
    gainedClueIds: ["CLUE_A16"],
    hiddenTruthReward: 10,
    choices: [
      choice("SCENE_004D_1_A", "前往白塔公寓", "技术名词最终仍指向现场。", "SCENE_006"),
      choice("SCENE_004D_1_B", "追问赵宏", "你用“地址映射”试探赵宏。", "SCENE_005"),
    ],
  }),
  baseScene({
    id: "SCENE_005",
    chapter: "人物调查",
    title: "第二个声音",
    uiType: "call",
    time: "02:32",
    location: "物业应急电话",
    kicker: "通话录音 / 异常背景声",
    paragraphs: [
      "你问他为什么这么紧张。",
      "赵宏压低声音：“如果你只是好奇，现在停下来还来得及。”",
      "听筒外有人低声说：“……观察局已经知道了。”匿名邮箱随即发来24层消防门旁的照片。",
    ],
    messages: [
      { sender: "赵宏", role: "incoming", text: "如果你只是好奇，现在停下来还来得及。", meta: "02:32" },
      { sender: "背景声", role: "incoming", text: "……观察局已经知道了。", meta: "声音增强" },
    ],
    evidenceClueIds: ["CLUE_005", "CLUE_006"],
    gainedClueIds: ["CLUE_005", "CLUE_006"],
    truthReward: 12,
    hiddenTruthReward: 11,
    choices: [
      choice("SCENE_005_A", "前往白塔公寓24层", "你结束通话，直奔24层。", "SCENE_006"),
      choice("SCENE_005_B", "调查保安林知远", "你先核对夜班保安的旧记录。", "SCENE_002D"),
      choice("SCENE_005_C", "调查观察局", "公开网络没有这个机构，只有失效索引。", "SCENE_003D"),
      choice("SCENE_005_D", "追踪匿名邮件来源", "邮件经过公寓内部网络转发。", "SCENE_006"),
    ],
  }),
  baseScene({
    id: "SCENE_006",
    chapter: "现场调查",
    title: "白塔公寓24层",
    uiType: "location",
    time: "02:36",
    location: "白塔公寓 · 24层",
    kicker: "第一视角 / 现场",
    paragraphs: [
      "电梯门打开。2401、2402、2403、2404。走廊尽头的墙面比周围新，消防门半掩着。",
    ],
    conditionalParagraphs: [
      {
        excludesClueIds: ["CLUE_002"],
        text: "你还不知道240是否曾存在，只能先靠现场确认。",
      },
      {
        requiresClueIds: ["CLUE_002"],
        text: "维修记录里的测试房号与眼前四个正常房号发生冲突。",
      },
    ],
    recordLines: ["2401", "2402", "2403", "2404", "走廊尽头 / 新漆覆盖", "消防门 / 未锁"],
    truthReward: 7,
    hiddenTruthReward: 5,
    choices: [
      choice("SCENE_006_A", "检查墙面", "你打开手机手电，从墙面侧方照过去。", "SCENE_007"),
      choice("SCENE_006_B", "检查消防门", "你把手放到冰冷的门把上。", "SCENE_006B"),
      choice("SCENE_006_C", "返回楼下找保安", "你决定先拆穿林知远的说法。", "SCENE_006C"),
      choice("SCENE_006_D", "观察周围环境", "你打开手机传感器缓慢走向尽头。", "SCENE_006D"),
    ],
  }),
  baseScene({
    id: "SCENE_006B",
    chapter: "现场调查",
    title: "消防门后的声音",
    uiType: "location",
    time: "02:38",
    location: "白塔公寓 · 24层尽头",
    kicker: "消防门 / 异常声响",
    paragraphs: [
      "门把手很冷，门缝里有潮湿气味。",
      "门后传来轻微的金属拖动声，像有什么东西在楼梯平台上移动。",
    ],
    gainedClueIds: ["CLUE_A08"],
    choices: [
      choice("SCENE_006B_A", "推开消防门", "你压下把手，门轴发出短响。", "SCENE_008"),
      choice("SCENE_006B_B", "检查墙面", "你先确认门旁被覆盖的痕迹。", "SCENE_007"),
      choice("SCENE_006B_C", "拍照取证", "你记录门缝和墙面色差。", "SCENE_007C"),
    ],
  }),
  baseScene({
    id: "SCENE_006C",
    chapter: "人物对质",
    title: "照流程处理",
    uiType: "call",
    time: "02:42",
    location: "白塔公寓 · 一层大厅",
    kicker: "林知远 / 口供变化",
    paragraphs: [
      "你质问：“你删过录像？”",
      "林知远脸色发白：“我只是照流程处理。”",
      "“谁让你处理？”",
      "“赵宏。”",
    ],
    gainedClueIds: ["CLUE_A09"],
    truthReward: 12,
    contradiction: {
      id: "CONTRADICTION_GUARD_DENIAL",
      text: "林知远此前否认知情，现在承认按赵宏要求处理过录像。",
    },
    choices: [
      choice("SCENE_006C_A", "质问赵宏", "你带着林知远的口供去找赵宏。", "SCENE_009"),
      choice("SCENE_006C_B", "返回24层", "你回到走廊尽头继续调查。", "SCENE_006"),
      choice("SCENE_006C_C", "检查监控室", "你要求查看原始操作日志。", "SCENE_006C_1"),
    ],
  }),
  baseScene({
    id: "SCENE_006C_1",
    chapter: "数字取证",
    title: "手动删除记录",
    uiType: "evidence",
    time: "02:45",
    location: "白塔公寓 · 监控室",
    kicker: "23:57-00:04 / 操作日志",
    paragraphs: [
      "24层昨晚23:57到00:04之间录像为空。",
      "日志显示它不是因故障丢失，而是在手动导出后被删除。",
    ],
    recordLines: ["23:57 / 开始导出 24F", "00:03 / 导出完成", "00:04 / 本地文件删除"],
    gainedClueIds: ["CLUE_A17"],
    hiddenTruthReward: 10,
    choices: [
      choice("SCENE_006C_1_A", "质问赵宏", "操作链已经足够让赵宏开口。", "SCENE_009"),
      choice("SCENE_006C_1_B", "返回24层", "你带着日志回到被删除画面的现场。", "SCENE_007"),
    ],
  }),
  baseScene({
    id: "SCENE_006D",
    chapter: "环境调查",
    title: "24层信号异常",
    uiType: "location",
    time: "02:39",
    location: "白塔公寓 · 24层",
    kicker: "传感器 / 方向偏移",
    paragraphs: [
      "靠近走廊尽头时，手机信号突然变弱，指南针方向偏移。",
      "尽头温度比其他区域低三度，但消防系统没有报警。",
    ],
    gainedClueIds: ["CLUE_A10"],
    hiddenTruthReward: 8,
    choices: [
      choice("SCENE_006D_A", "检查墙面", "异常中心正好位于新刷墙面。", "SCENE_007"),
      choice("SCENE_006D_B", "检查消防门", "信号在门缝附近降到最低。", "SCENE_006B"),
      choice(
        "SCENE_006D_C1",
        "联系沈岚相关线索",
        "地址映射缓存里留下了工程师沈岚的旧签名。",
        "SCENE_010",
        { requiresClueIds: ["CLUE_A16"], addFlags: ["CONTACTED_SHEN_EARLY"] },
      ),
      choice(
        "SCENE_006D_C2",
        "追查异常来源",
        "你没有联系人，只能先推开消防门寻找实体证据。",
        "SCENE_008",
        { excludesClueIds: ["CLUE_A16"] },
      ),
    ],
  }),
  baseScene({
    id: "SCENE_007",
    chapter: "现场调查",
    title: "被覆盖的数字",
    uiType: "reveal",
    time: "02:39",
    location: "白塔公寓 · 24层尽头",
    kicker: "侧光检视 / 墙面痕迹",
    paragraphs: [
      "墙面被重新粉刷过。冷光贴着表面扫过去，旧金属牌留下的压痕慢慢浮出来。",
      "24_。最后一位不像数字，更像被刻意抹掉的分隔符。",
      "消防门后传来一声闷响。",
    ],
    evidenceClueIds: ["CLUE_007"],
    gainedClueIds: ["CLUE_007"],
    truthReward: 9,
    hiddenTruthReward: 8,
    contradiction: {
      id: "CONTRADICTION_ADDRESS_FORMAT",
      text: "“240”可能不是房间编号，而是一段被删去格式的地址。",
    },
    reveal: "推理更新：240 ≠ 普通房号",
    choices: [
      choice("SCENE_007_A", "推开消防门", "门轴发出短响，楼梯平台没有人。", "SCENE_008"),
      choice("SCENE_007_B", "贴门偷听", "你屏住呼吸靠近门板。", "SCENE_007B"),
      choice("SCENE_007_C", "拍照取证", "你让图像系统分析墙面色差。", "SCENE_007C"),
      choice("SCENE_007_D", "联系保安上楼", "林知远最终接起电话。", "SCENE_007D"),
    ],
  }),
  baseScene({
    id: "SCENE_007B",
    chapter: "语音取证",
    title: "同步失败广播",
    uiType: "evidence",
    time: "02:40",
    location: "白塔公寓 · 24层尽头",
    kicker: "门后广播 / 非消防频段",
    paragraphs: [
      "门后有很轻的电流声。",
      "一段断断续续的广播穿过门板：“……地址……同步失败……”",
    ],
    evidenceClueIds: ["CLUE_A18"],
    gainedClueIds: ["CLUE_A18"],
    hiddenTruthReward: 12,
    choices: [
      choice("SCENE_007B_A", "推开消防门", "广播停止，你立刻推门。", "SCENE_008"),
      choice("SCENE_007B_B", "拍照取证", "你先记录门旁标识痕迹。", "SCENE_007C"),
    ],
  }),
  baseScene({
    id: "SCENE_007C",
    chapter: "图片取证",
    title: "墙面取证照片",
    uiType: "evidence",
    time: "02:41",
    location: "白塔公寓 · 24层尽头",
    kicker: "色差识别 / 金属牌",
    paragraphs: [
      "照片自动对比旧墙面色差。",
      "系统识别：此处曾安装金属牌，可能尺寸20cm × 8cm。",
    ],
    evidenceClueIds: ["CLUE_A19"],
    gainedClueIds: ["CLUE_A19"],
    truthReward: 8,
    choices: [
      choice("SCENE_007C_A", "推开消防门", "证据保存后，你压下门把。", "SCENE_008"),
      choice("SCENE_007C_B", "联系保安", "你要求林知远上楼解释。", "SCENE_007D"),
    ],
  }),
  baseScene({
    id: "SCENE_007D",
    chapter: "人物对质",
    title: "外包封墙",
    uiType: "call",
    time: "02:43",
    location: "白塔公寓 · 24层尽头",
    kicker: "林知远 / 墙面处理",
    paragraphs: [
      "林知远上楼后看到墙面，立刻说：“不是我刷的。”",
      "你问是谁。他回答：“赵宏找外包做的。”",
    ],
    gainedClueIds: ["CLUE_A20"],
    choices: [
      choice("SCENE_007D_A", "推开消防门", "你让林知远留在走廊，自己进门。", "SCENE_008"),
      choice("SCENE_007D_B", "质问赵宏", "你直接去物业办公室。", "SCENE_009"),
    ],
  }),
  baseScene({
    id: "SCENE_008",
    chapter: "地址反转",
    title: "WH-24-0",
    uiType: "evidence",
    time: "02:46",
    location: "24层消防通道",
    kicker: "黑色文件袋 / 封存标签",
    paragraphs: [
      "楼梯平台上放着一个黑色文件袋，标签写着：WH-24-0。",
      "结构图显示2404之后还有一块“24-0测试空间”；封闭施工申请要求删除公开记录，批准人赵宏。",
    ],
    recordLines: [
      "24层结构图 / 2404后方：24-0测试空间",
      "施工申请 / 封闭24-0区域",
      "公开记录处理 / 删除",
      "批准人 / 赵宏",
      "附件照片 / 第一位失踪者",
    ],
    evidenceClueIds: ["CLUE_008"],
    gainedClueIds: ["CLUE_008"],
    truthReward: 11,
    hiddenTruthReward: 14,
    contradiction: {
      id: "CONTRADICTION_240_IS_ADDRESS",
      text: "物业把240当房号注销，但结构图把它写成数据格式24-0。",
    },
    reveal: "真相更新：240不是房号，而是24-0。",
    choices: [
      choice(
        "SCENE_008_A",
        "寻找沈岚",
        "文件袋纸条上留下工程师沈岚的旧联系方式。",
        "SCENE_008A",
        { addFlags: ["SHEN_FIRST"] },
      ),
      choice("SCENE_008_B", "返回质问赵宏", "你带着结构图回到物业办公室。", "SCENE_009"),
      choice(
        "SCENE_008_C",
        "跳过赵宏，联系沈岚",
        "你把WH-24-0标签发给文件袋里的工程师联系人。",
        "ENDING_SHEN_EARLY",
        { addFlags: ["SHEN_FIRST"] },
      ),
    ],
  }),
  baseScene({
    id: "SCENE_008A",
    chapter: "连接者",
    title: "先找沈岚",
    uiType: "chat",
    time: "02:50",
    location: "白塔公寓 · 地下停车场",
    kicker: "工程师旧号码 / 已接通",
    paragraphs: [
      "你根据文件袋里的纸条联系沈岚。她没有问你是谁，只让你到地下停车场。",
      "“你没有先去找赵宏，说明你已经看懂了24-0不是普通地点。”",
    ],
    gainedClueIds: ["CLUE_A21"],
    hiddenTruthReward: 20,
    choices: [
      choice("SCENE_008A_A", "继续听沈岚解释", "她打开一份未联网的项目记录。", "SCENE_010"),
      choice("SCENE_008A_B", "先确认顾晨档案", "她让你先去赵宏终端拿到WH-D-118。", "SCENE_009"),
    ],
  }),
  baseScene({
    id: "ENDING_SHEN_EARLY",
    chapter: "提前归档",
    title: "沈岚的确认",
    uiType: "ending",
    time: "02:53",
    location: "白塔公寓 · 地下停车场",
    kicker: "跳过物业口供 / 连接者确认",
    paragraphs: [
      "沈岚看完WH-24-0标签后确认：24-0不是普通地点，而是地址映射实验留下的数据节点。",
      "你没有拿到赵宏的完整口供，也没有展开WH-D-118，但已经找到一条通往隐藏真相的直接路径。",
    ],
    gainedClueIds: ["CLUE_A21"],
    truthReward: 12,
    hiddenTruthReward: 20,
  }),
  baseScene({
    id: "SCENE_009",
    chapter: "封存档案",
    title: "WH-D-118",
    uiType: "evidence",
    time: "02:52",
    location: "赵宏办公室",
    kicker: "本地终端 / 未同步档案",
    paragraphs: [
      "赵宏看见文件袋或监控日志后不再否认。",
      "三年前，白塔公寓与北星数据集团进行“空间导航测试”。真实测试地点就是24-0。",
      "项目第63天，白港大学学生顾晨进入24-0，此后失踪。",
      "赵宏电脑弹出沈岚消息：别告诉他观察局的事。",
    ],
    evidenceClueIds: ["CLUE_009"],
    gainedClueIds: ["CLUE_009"],
    truthReward: 10,
    hiddenTruthReward: 12,
    choices: [
      choice("SCENE_009_A", "追查沈岚", "消息路由指向地下停车场。", "SCENE_010"),
      choice("SCENE_009_B", "逼问观察局", "你直接说出那个被避开的名字。", "SCENE_009B"),
      choice("SCENE_009_C", "查看完整WH-D-118档案", "你打开第63天之后的隐藏页。", "SCENE_009C"),
    ],
  }),
  baseScene({
    id: "SCENE_009B",
    chapter: "封锁痕迹",
    title: "观察局关键词",
    uiType: "reveal",
    time: "02:54",
    location: "赵宏办公室",
    kicker: "远程连接 / 强制中断",
    paragraphs: [
      "赵宏立刻打断：“别在这里说这个名字。”",
      "办公室灯闪了一下，电脑弹出提示：远程连接已断开。",
      "“你刚刚触发了关键词。”",
    ],
    gainedClueIds: ["CLUE_A22"],
    hiddenTruthReward: 15,
    choices: [
      choice("SCENE_009B_A", "追查沈岚", "只有项目工程师能解释这次中断。", "SCENE_010"),
      choice("SCENE_009B_B", "查看WH-D-118", "你趁终端离线打开完整档案。", "SCENE_009C"),
    ],
  }),
  baseScene({
    id: "SCENE_009C",
    chapter: "封存档案",
    title: "顾晨档案",
    uiType: "evidence",
    time: "02:56",
    location: "赵宏办公室 · 离线终端",
    kicker: "第63天 / 匿名导航",
    paragraphs: [
      "第63天失踪者姓名：顾晨，白港大学学生。",
      "失踪前，他连续三晚收到匿名导航链接。链接标题：“你要找的房间在24-0。”",
    ],
    evidenceClueIds: ["CLUE_A23"],
    gainedClueIds: ["CLUE_A23"],
    truthReward: 10,
    hiddenTruthReward: 10,
    choices: [
      choice("SCENE_009C_A", "追查沈岚", "顾晨与当前失踪者走过同一条路。", "SCENE_010"),
      choice("SCENE_009C_B", "提交阶段性报告", "你决定先归档已确认的部分。", "ENDING_B"),
    ],
  }),
  baseScene({
    id: "SCENE_010",
    chapter: "隐藏真相",
    title: "地址映射实验",
    uiType: "reveal",
    time: "03:00",
    location: "白塔公寓 · 地下停车场",
    kicker: "联系人接触 / 沈岚",
    paragraphs: [
      "停车场转角，沈岚从一辆熄火的车旁走出来。",
      "“24-0不是房间。它是一条数据地址。”",
      "三年前项目真实名称是地址映射实验。观察局接管项目并删除记录。",
      "当前失踪学生发现残留数据后，是主动进入24-0的。",
      "沈岚递来一张自拍：失踪学生站在入口前，背后还有三年前失踪的顾晨。",
    ],
    conditionalParagraphs: [
      {
        requiresVisitedSceneIds: ["SCENE_008A"],
        text: "沈岚补了一句：“你没有先找赵宏，这条路让你更早看到了地址层。”",
      },
    ],
    recordLines: [
      "项目真实名称 / 地址映射实验",
      "24-0 / 数据地址节点",
      "接管方 / 城市观察局",
      "当前失踪学生 / 主动进入",
      "照片第二人 / 顾晨",
    ],
    truthReward: 9,
    hiddenTruthReward: 11,
    contradiction: {
      id: "CONTRADICTION_VOLUNTARY_ENTRY",
      text: "失踪学生不是被带走，而是沿匿名导航主动进入24-0。",
    },
    reveal: "隐藏真相：24-0是被封闭的数据地址节点。",
    choices: [
      choice("SCENE_010_A", "提交调查报告", "你保留顾晨疑点，先提交本案结论。", "ENDING_RESOLVE"),
      choice("SCENE_010_B", "追查WH-A-024", "你尝试打开A级封存档案。", "SCENE_010B"),
      choice("SCENE_010_C", "询问顾晨为什么还活着", "沈岚沉默了很久。", "SCENE_011"),
    ],
  }),
  baseScene({
    id: "SCENE_010B",
    chapter: "权限突破",
    title: "三帧监控",
    uiType: "evidence",
    time: "03:02",
    location: "WH-A-024权限拦截页",
    kicker: "A级权限不足 / 图像泄露",
    paragraphs: [
      "系统显示：A级权限不足。",
      "页面关闭前闪现三帧监控：海湾区地铁站、旧城区钟楼、白港大学图书馆。",
      "同一个人出现在三张图里，年龄没有变化。",
    ],
    evidenceClueIds: ["CLUE_A24"],
    gainedClueIds: ["CLUE_A24"],
    hiddenTruthReward: 18,
    reveal: "深层异常：顾晨在三年间保持相同年龄。",
    choices: [
      choice("SCENE_010B_A", "生成调查档案", "权限页面关闭，证据已写入本地档案。", "ENDING_RESOLVE"),
      choice("SCENE_010B_B", "让沈岚确认身份", "她确认三张图里都是顾晨。", "SCENE_011"),
    ],
  }),
  baseScene({
    id: "SCENE_011",
    chapter: "终局",
    title: "他从未变老",
    uiType: "ending",
    time: "03:04",
    location: "白塔公寓 · 地下停车场",
    kicker: "WH-A-024 / 封存级别 A",
    paragraphs: [
      "沈岚回答：“我从来没说过他活着。”",
      "WH-A-024显示，顾晨三年来出现在海湾区地铁站、旧城区钟楼、工业港仓库与白港大学图书馆。",
      "每一张画面里的他，都和失踪那天一样年轻。",
    ],
    evidenceClueIds: ["CLUE_010"],
    gainedClueIds: ["CLUE_010"],
    truthReward: 4,
    hiddenTruthReward: 8,
    reveal: "深层异常确认：顾晨持续出现，年龄不变。",
  }),
  baseScene({
    id: "ENDING_B",
    chapter: "阶段结算",
    title: "阶段性归档",
    uiType: "ending",
    time: "03:00",
    location: "暗线本地档案",
    kicker: "WH-D-118 / 调查中止",
    paragraphs: [
      "你确认24-0真实存在，也找到了顾晨进入其中的记录。",
      "但你没有继续追查沈岚、观察局与顾晨之后的异常。",
    ],
    endingCap: "B",
  }),
  baseScene({
    id: "ENDING_RESOLVE",
    chapter: "案件结算",
    title: "调查报告",
    uiType: "ending",
    time: "03:05",
    location: "暗线本地档案",
    kicker: "完成度计算 / 动态评级",
    paragraphs: ["系统正在根据已收集线索、矛盾与隐藏事实生成最终档案。"],
  }),
];

export const endings: Room240Ending[] = [
  {
    id: "ENDING_S",
    rank: "S",
    title: "暗线记录者",
    conclusion:
      "你不仅破解了D-0007的失踪真相，还发现了WH-A-024的核心异常。你已经不只是旁观者。你被暗线记录了。",
    unlocks: ["WH-A-024《不存在的24楼》", "沈岚联系人", "暗线接触度 +20"],
    archiveIds: ["WH-A-024"],
    contacts: ["沈岚"],
    darklineContactGain: 20,
  },
  {
    id: "ENDING_A_PLUS",
    rank: "A+",
    title: "数据地址节点",
    conclusion:
      "你查明了240号房间的真相。240并不是房号，而是24-0，一个被观察局封锁的数据地址节点。你发现顾晨仍在出现，但还不知道他到底是什么。",
    unlocks: ["WH-A-024《不存在的24楼》", "沈岚联系人"],
    archiveIds: ["WH-A-024"],
    contacts: ["沈岚"],
  },
  {
    id: "ENDING_A",
    rank: "A",
    title: "主动进入24-0",
    conclusion:
      "你确认失踪学生是主动进入24-0，也发现24-0与三年前的实验有关。但你还没有完全理解观察局和顾晨的异常。",
    unlocks: ["WH-A-024线索", "沈岚联系人"],
    archiveIds: ["WH-A-024-LEAD"],
    contacts: ["沈岚"],
  },
  {
    id: "ENDING_B",
    rank: "B",
    title: "行动方向确认",
    conclusion:
      "你找到了失踪学生的行动方向，也确认24-0真实存在，但遗漏了关键隐藏真相。",
    unlocks: ["后续传闻", "未解锁完整A级档案"],
    archiveIds: ["WH-A-024-RUMOR"],
    contacts: [],
  },
  {
    id: "ENDING_C",
    rank: "C",
    title: "异常投诉",
    conclusion:
      "你发现240号房间并不存在，但调查只停留在物业隐瞒层面。你没有找到24-0真正的性质。",
    unlocks: ["异常投诉记录"],
    archiveIds: [],
    contacts: [],
  },
  {
    id: "ENDING_D",
    rank: "D",
    title: "案件暂时中止",
    conclusion:
      "你没有找到足够证据。案件暂时中止。但三天后，又有人收到同样的短信：“不要来240号房。”",
    unlocks: ["重复短信传闻"],
    archiveIds: [],
    contacts: [],
  },
];

export const reasoningHints = [
  { minTruth: 90, text: "失踪学生主动进入24-0；物业隐瞒只是封锁链的一部分。" },
  { minTruth: 75, text: "240应被重写为24-0，它真实存在于旧结构与项目档案中。" },
  { minTruth: 50, text: "公开房号与历史记录矛盾，赵宏和林知远都在回避24层。" },
  { minTruth: 20, text: "短信、房号和24层之间存在重复出现的数字关系。" },
  { minTruth: 0, text: "先确认短信来源，或直接调查白塔公寓。" },
];

export function resolveRoom240Ending(
  truthCompletion: number,
  hiddenTruthCompletion: number,
  criticalClueCount: number,
  endingCap?: "B",
) {
  let endingId: Room240Ending["id"];

  if (truthCompletion >= 100 && hiddenTruthCompletion >= 95 && criticalClueCount >= 12) {
    endingId = "ENDING_S";
  } else if (truthCompletion >= 100 && hiddenTruthCompletion >= 80) {
    endingId = "ENDING_A_PLUS";
  } else if (truthCompletion >= 90 && hiddenTruthCompletion >= 60) {
    endingId = "ENDING_A";
  } else if (truthCompletion >= 75) {
    endingId = "ENDING_B";
  } else if (truthCompletion >= 50) {
    endingId = "ENDING_C";
  } else {
    endingId = "ENDING_D";
  }

  if (endingCap === "B" && ["ENDING_S", "ENDING_A_PLUS", "ENDING_A"].includes(endingId)) {
    endingId = "ENDING_B";
  }

  return endings.find((ending) => ending.id === endingId) ?? endings[endings.length - 1];
}

export const case240Room = {
  caseMeta,
  truthTree,
  npcs,
  clues,
  scenes,
  endings,
  reasoningHints,
};
