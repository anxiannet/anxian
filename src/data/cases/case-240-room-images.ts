export type Case240RoomImage = {
  imageId: string;
  sceneId: string;
  filePath: string;
  title: string;
  description: string;
  npcName: string;
  dialogue: string;
  prompt: string;
  altText: string;
};

export const case240RoomImages: Case240RoomImage[] = [
  {
    imageId: "IMG_001",
    sceneId: "SCENE_001",
    filePath: "/cases/240-room/images/scene-001-message.png",
    title: "凌晨2:13的撤回消息",
    description: "玩家在雨夜收到指向240号房的陌生短信。",
    npcName: "未知来源",
    dialogue: "不要来240号房。",
    altText: "第一视角手持手机，在昏暗房间中看见指向240号房的撤回短信。",
    prompt:
      "第一视角手机摄影，竖屏，玩家手持手机，凌晨2:13，手机聊天界面显示一条已撤回的陌生短信，内容为不要来240号房，窗外雨夜，室内昏暗，都市悬疑，真实摄影感，冷色调，电影感，浅景深，轻微颗粒感，低饱和，高细节，不出现真实品牌，不出现真实地点",
  },
  {
    imageId: "IMG_002",
    sceneId: "SCENE_006",
    filePath: "/cases/240-room/images/scene-006-lobby-guard.png",
    title: "大厅里的夜班保安",
    description: "凌晨的公寓大厅里，林知远第一次正面回应玩家。",
    npcName: "林知远",
    dialogue: "这么晚，你找谁？",
    altText: "第一视角走进昏暗公寓大厅，夜班保安林知远紧张地抬头。",
    prompt:
      "第一视角真实摄影，竖屏，凌晨雨夜，虚构公寓大厅，冷白灯，前台夜班保安坐在桌后，保安抬头看向镜头，神情紧张，大厅空旷安静，都市悬疑，电影感，低饱和，暗部细节清晰，轻微颗粒感，不出现真实公寓名称，不出现真实品牌",
  },
  {
    imageId: "IMG_003",
    sceneId: "SCENE_006",
    filePath: "/cases/240-room/images/scene-006-24f-corridor.png",
    title: "24层走廊",
    description: "2401至2404依次排列，走廊尽头却没有240号房。",
    npcName: "系统",
    dialogue: "这里没有240号房。",
    altText: "第一视角站在24层电梯口，看见房号2401至2404和尽头的新漆墙面。",
    prompt:
      "第一视角真实摄影，竖屏，虚构公寓24层走廊，电梯门刚打开，狭长走廊，两侧房号为2401 2402 2403 2404，走廊尽头墙面有一块明显重新粉刷的区域，冷色调，雨夜氛围，安静压抑，都市悬疑，电影感，低饱和，轻微颗粒感，不出现真实地点",
  },
  {
    imageId: "IMG_004",
    sceneId: "SCENE_007",
    filePath: "/cases/240-room/images/scene-007-wall-mark.png",
    title: "被覆盖的标识",
    description: "侧光照射后，新漆下显露出旧金属牌与“24_”痕迹。",
    npcName: "系统",
    dialogue: "240，可能不是房号。",
    altText: "第一视角用手机手电照射重新粉刷的墙面，显露出24下划线痕迹。",
    prompt:
      "第一视角手机摄影，竖屏，近距离墙面取证，手机手电照射重新粉刷过的墙面，墙面下隐约露出旧金属牌痕迹和数字24_，最后一位被磨损遮挡，细节清晰，冷色调，都市悬疑，真实摄影感，电影感，轻微颗粒感，不出现真实地点",
  },
  {
    imageId: "IMG_005",
    sceneId: "SCENE_008",
    filePath: "/cases/240-room/images/scene-008-stairwell-filebag.png",
    title: "WH-24-0黑色文件袋",
    description: "消防通道的潮湿平台上，文件袋像是刚被人留下。",
    npcName: "未知来源",
    dialogue: "如果你看见这份档案，说明他们又开始了。",
    altText: "第一视角推开消防门，看见潮湿楼梯平台上的WH-24-0黑色文件袋。",
    prompt:
      "第一视角真实摄影，竖屏，虚构公寓消防楼梯间，昏暗冷光，楼梯平台潮湿，一个黑色文件袋躺在地上，标签写着WH-24-0，门缝透进冷光，雨夜氛围，都市悬疑，电影感，低饱和，高细节，轻微颗粒感，不出现真实地点",
  },
  {
    imageId: "IMG_006",
    sceneId: "SCENE_009",
    filePath: "/cases/240-room/images/scene-009-zhao-office.png",
    title: "赵宏的办公室",
    description: "赵宏试图合上屏幕，桌面上散落着三年前的项目档案。",
    npcName: "赵宏",
    dialogue: "你已经找到那里了？",
    altText: "第一视角站在物业办公室门口，看见赵宏紧张地准备合上电脑。",
    prompt:
      "第一视角真实摄影，竖屏，深夜物业办公室，虚构公寓管理中心，男人坐在电脑前，桌上散落旧档案和咖啡杯，屏幕弹出短消息，男人神情紧张正准备合上屏幕，冷色调，都市悬疑，电影感，低饱和，暗部细节清晰，不出现真实品牌",
  },
  {
    imageId: "IMG_007",
    sceneId: "SCENE_010",
    filePath: "/cases/240-room/images/scene-010-shenlan-parking.png",
    title: "停车场里的沈岚",
    description: "凌晨停车场中，沈岚第一次正面出现。",
    npcName: "沈岚",
    dialogue: "24-0从来不是房间。",
    altText: "第一视角看见沈岚站在地下停车场的冷色路灯下。",
    prompt:
      "第一视角真实摄影，竖屏，凌晨地下停车场，地面雨水反光，远处冷色路灯下站着一名黑色风衣女人，戴口罩，看向镜头，氛围压抑，都市悬疑，电影感，低饱和，浅景深，轻微颗粒感，不出现真实地点，不出现真实车牌",
  },
  {
    imageId: "IMG_008",
    sceneId: "SCENE_011",
    filePath: "/cases/240-room/images/scene-011-final-photo.png",
    title: "三年前的人",
    description: "当前失踪学生的自拍中，顾晨站在24-0入口后方。",
    npcName: "沈岚",
    dialogue: "我从来没说过他活着。",
    altText: "第一视角查看一张旧照片，失踪学生自拍时顾晨站在24-0入口后方。",
    prompt:
      "第一视角真实摄影，竖屏，玩家手中拿着一张旧照片，照片内容是虚构公寓24层尽头入口，一个年轻学生正在自拍，他背后站着另一个年轻人，神情平静，画面诡异但不恐怖血腥，冷色调，都市悬疑，电影感，低饱和，轻微颗粒感，不出现真实人物，不出现真实地点",
  },
];

export const case240RoomImagesById = Object.fromEntries(
  case240RoomImages.map((image) => [image.imageId, image]),
) as Record<string, Case240RoomImage>;
