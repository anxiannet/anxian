# 第十三章：档案系统（Archive System）

## 13.1 档案目标

档案不是资料库。

档案是玩家调查过程的沉淀。

档案系统负责：

- 记录案件线索
- 归档 NPC 信息
- 保存地点信息
- 收纳都市传说
- 追踪暗线网络
- 呈现调查进度
- 形成案件关联图
- 支撑后续案件触发

原则：

- 档案必须来自调查。
- 档案必须可追溯来源。
- 档案必须服务推理。
- 档案不能一次性暴露真相。

禁止把档案做成大段设定百科。

---

## 13.2 案件档案

案件档案用于记录单个案件的完整调查过程。

结构：

```json
{
  "case_archive_id": "CASE_ARCHIVE_001",
  "case_id": "CASE_001",
  "case_name": "不存在的240号房",
  "status": "investigating",
  "summary": "白塔公寓24楼出现一间系统中不存在的房间。",
  "known_facts": [],
  "open_questions": [],
  "evidence_ids": [],
  "npc_ids": [],
  "location_ids": [],
  "timeline": [],
  "truth_progress": 0,
  "archive_completion": 0
}
```

案件状态：

- `new`：新案件。
- `investigating`：调查中。
- `reasoning`：进入推理阶段。
- `solved`：已得出真相。
- `archived`：已归档。
- `hidden`：隐藏案件。

案件档案应包含：

- 案件简介
- 已知事实
- 未解问题
- 证据列表
- 涉及 NPC
- 涉及地点
- 时间线
- 推理记录
- 结案结论

---

## 13.3 NPC 档案

NPC 档案用于记录玩家接触过的人物。

NPC 不一定是真人身份。

也可以是匿名账号、举报人、目击者、管理员、失踪者、档案代号。

结构：

```json
{
  "npc_id": "NPC_001",
  "display_name": "匿名举报者A",
  "known_aliases": [],
  "first_seen_case_id": "CASE_001",
  "role_tags": [
    "witness",
    "anonymous_tipster"
  ],
  "known_facts": [],
  "contradictions": [],
  "related_evidence_ids": [],
  "related_case_ids": [],
  "trust_level": "unknown",
  "profile_completion": 0
}
```

NPC 档案信息来源：

- 聊天记录
- 语音证据
- 图片证据
- 新闻截图
- 监控信息
- 玩家询问
- 其他 NPC 提及

信任等级：

- `unknown`：未知。
- `reliable`：可信。
- `questionable`：可疑。
- `misleading`：存在误导。
- `hostile`：主动阻碍调查。

规则：

- NPC 档案只能记录玩家已发现信息。
- NPC 档案可以保留矛盾点。
- NPC 档案不能提前标注最终身份。
- NPC 的真实身份可以作为隐藏字段延迟解锁。

---

## 13.4 地点档案

地点档案用于记录白港市中的可调查地点。

全部地点必须虚构。

禁止使用真实住址、真实学校、真实物业机构、真实公司或真实组织。

结构：

```json
{
  "location_id": "LOC_001",
  "name": "白塔公寓",
  "district": "西港区",
  "location_type": "apartment",
  "description": "位于西港区边缘的旧式高层公寓。",
  "known_features": [],
  "related_case_ids": [],
  "related_npc_ids": [],
  "map_points": [],
  "access_level": "public",
  "location_completion": 0
}
```

地点类型：

- 公寓
- 学校
- 港口
- 地铁站
- 商场
- 医院
- 仓库
- 办公楼
- 天桥
- 停车场
- 废弃设施

地点档案应包含：

- 所属区域
- 可调查场景
- 关联案件
- 关联 NPC
- 已发现异常
- 地图坐标
- 进入条件

---

## 13.5 都市传说档案

都市传说档案用于记录白港市流传的异常故事。

都市传说不一定全部真实。

它们可以是谣言、误传、伪装、集体记忆，也可以是暗线入口。

结构：

```json
{
  "legend_id": "LEGEND_001",
  "title": "不存在的240号房",
  "district": "西港区",
  "legend_level": "local",
  "rumor_summary": "有人说白塔公寓24楼会在凌晨出现一间不存在的房间。",
  "known_versions": [],
  "verified_parts": [],
  "false_parts": [],
  "related_case_ids": [],
  "related_location_ids": [],
  "legend_completion": 0
}
```

传说等级：

- `local`：局部传说。
- `district`：区域传说。
- `citywide`：全城传说。
- `darkline`：疑似暗线相关。

规则：

- 都市传说必须有多个版本。
- 玩家需要通过案件验证其中部分内容。
- 传说档案不能直接等同于真相。
- 传说可以触发新案件。

---

## 13.6 暗线档案

暗线档案用于记录玩家逐步接触到的隐藏信息网络。

暗线档案不应在游戏初期完整开放。

结构：

```json
{
  "darkline_archive_id": "DARKLINE_001",
  "node_name": "未知节点-白塔",
  "node_type": "unknown",
  "discovery_case_id": "CASE_001",
  "related_nodes": [],
  "known_signals": [],
  "confirmed_links": [],
  "unverified_links": [],
  "access_level": 1,
  "completion": 0
}
```

暗线节点类型：

- `unknown`：未知节点。
- `person`：人物节点。
- `place`：地点节点。
- `event`：事件节点。
- `signal`：信息信号。
- `archive`：档案节点。
- `organization`：组织节点。

规则：

- 暗线档案必须逐步解锁。
- 初期只显示碎片，不显示全貌。
- 暗线档案用于长期目标，不干扰 10 分钟案件体验。
- 每个暗线节点都必须能追溯到至少一个案件证据。

---

## 13.7 调查员日志

调查员日志用于记录玩家第一视角的调查过程。

日志不是系统说明。

日志应像玩家自己的调查笔记。

结构：

```json
{
  "log_id": "LOG_001",
  "case_id": "CASE_001",
  "created_at": "2026-06-07T02:13:00+08:00",
  "log_type": "observation",
  "content": "24楼走廊的灯比其他楼层暗，门牌反光里似乎有一道影子。",
  "linked_evidence_ids": [
    "IMG_001"
  ],
  "linked_question_ids": []
}
```

日志类型：

- `observation`：观察记录。
- `question`：疑问记录。
- `hypothesis`：推测记录。
- `contradiction`：矛盾记录。
- `conclusion`：结论记录。

规则：

- 日志可以由系统自动生成。
- 玩家也可以手动补充。
- 自动日志必须简短。
- 日志不能替玩家直接说出最终答案。

---

## 13.8 档案完成度

档案完成度用于反馈玩家调查进度。

完成度不是数值刷怪。

完成度用于提示玩家还有信息未发现。

结构：

```json
{
  "archive_completion": {
    "case": 72,
    "npc": 45,
    "location": 60,
    "legend": 30,
    "darkline": 8
  }
}
```

完成度来源：

- 已发现证据数量
- 已解锁 NPC 信息
- 已确认地点信息
- 已验证传说内容
- 已建立关联关系
- 已完成推理节点

规则：

- 完成度不应强迫玩家刷满。
- 主线真相允许在 60% 到 80% 完成度时推理得出。
- 100% 完成度用于隐藏结局、完整档案和排行榜。

---

## 13.9 隐藏档案

隐藏档案用于奖励深度调查。

隐藏档案不影响基础结案。

结构：

```json
{
  "hidden_archive_id": "HARCHIVE_001",
  "title": "白塔公寓旧住户名单",
  "unlock_status": "locked",
  "unlock_hint": "需要确认24楼旧门禁记录。",
  "related_case_ids": [],
  "related_evidence_ids": [],
  "reward_type": "new_case_seed"
}
```

隐藏档案类型：

- 隐藏 NPC 身份
- 旧案件记录
- 城市传说真版本
- 暗线节点
- 隐藏结局线索
- 新案件种子

规则：

- 隐藏档案必须有提示。
- 隐藏档案不能靠随机点击解锁。
- 隐藏档案必须与已有线索有关。
- 隐藏档案可以影响排行榜。

---

## 13.10 档案解锁条件

档案解锁必须清晰、可追踪。

结构：

```json
{
  "unlock_condition": {
    "target_archive_id": "NPC_001",
    "required_evidence_ids": [
      "AUD_001",
      "IMG_003"
    ],
    "required_actions": [
      "listen_audio_twice",
      "inspect_image_detail"
    ],
    "required_attributes": {
      "observation": 40,
      "reasoning": 35
    },
    "unlock_result": "显示NPC声音档案"
  }
}
```

常见解锁条件：

- 获得指定证据
- 查看图片细节
- 复听音频
- 完成对话追问
- 发现矛盾点
- 完成一次推理
- 达到属性门槛
- 完成前置案件

规则：

- 关键档案不能设置过高门槛。
- 隐藏档案可以设置复合条件。
- 解锁条件不得依赖真实时间长等待。
- 解锁后必须说明新增了什么信息。

---

## 13.11 档案关联图

档案关联图用于展示案件、NPC、地点、证据、传说和暗线节点之间的关系。

关联图不是复杂技能树。

关联图是调查地图。

结构：

```json
{
  "graph_id": "GRAPH_CASE_001",
  "nodes": [
    {
      "id": "CASE_001",
      "type": "case",
      "label": "不存在的240号房"
    },
    {
      "id": "LOC_001",
      "type": "location",
      "label": "白塔公寓"
    },
    {
      "id": "NPC_001",
      "type": "npc",
      "label": "匿名举报者A"
    }
  ],
  "edges": [
    {
      "from": "CASE_001",
      "to": "LOC_001",
      "relation": "发生地点",
      "confidence": "confirmed"
    },
    {
      "from": "NPC_001",
      "to": "CASE_001",
      "relation": "提供线索",
      "confidence": "unverified"
    }
  ]
}
```

关联置信度：

- `confirmed`：已确认。
- `likely`：大概率。
- `unverified`：未验证。
- `contradicted`：存在矛盾。

规则：

- 关联图只显示玩家已发现节点。
- 未发现节点不得用问号占位剧透。
- 关系必须来自证据或日志。
- 玩家可以通过关联图发现新的调查方向。

---

## 13.12 档案搜索系统

档案搜索系统用于帮助玩家快速检索已获得信息。

搜索不是解谜捷径。

搜索只能返回玩家已经解锁的内容。

结构：

```json
{
  "search_query": "24楼 电梯",
  "scope": [
    "case",
    "npc",
    "location",
    "evidence",
    "legend",
    "darkline",
    "log"
  ],
  "results": [
    {
      "archive_id": "CASE_ARCHIVE_001",
      "type": "case",
      "title": "不存在的240号房",
      "matched_fields": [
        "known_facts",
        "timeline"
      ],
      "snippet": "02:13，24楼电梯曾短暂开启。"
    }
  ]
}
```

搜索支持：

- 关键词搜索
- 标签搜索
- 地点搜索
- NPC 搜索
- 时间搜索
- 证据类型搜索
- 矛盾点搜索

规则：

- 搜索结果必须来自已解锁档案。
- 搜索不得生成新信息。
- 搜索可以高亮相关线索。
- 搜索可以推荐“继续调查方向”，但不能直接给出答案。
