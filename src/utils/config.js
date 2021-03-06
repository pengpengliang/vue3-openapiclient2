/*
 * @Date: 2021-01-20 15:33:22
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
let Config = {
  webRoot: "http://47.106.120.152:8080/apigateway/openapiservice",
  // webRoot: 'http://120.79.36.25:8080/apigateway_open/openapiservice',
  gatewayUrl: "http://47.106.120.152:8080/apigateway",
  fileUrl: "http://120.79.36.25:8080/file",
  systemName: "国土空间基础信息平台-共享交换系统",
  copyrightInfo: "自然资源和规划局",
  syskey: "1",
  baseLayersType: "0", // 底图类型 0 公司底图 1 天地图
  questionList: [
    {
      questionTitle: "Q1：什么是切图方式？？",
      answer:
        "A:平台使用地图中间件技术，地图中间件能够实现对服务的分层分级控制，并能解决高访问量带来的压力。，对注册进来的服务进行转发切图。平台的切图方式分为两种：按服务切图和按图层切图。按服务切图指地图中间件对服务进行转发切图，服务的查看和调用均基于服务本身。按图层切图指地图中间件对服务中的每个图层进行转发切图，服务提供方可对申请者进行不同图层的权限控制，同时使用者在浏览服务时可按图层叠加。需要注意的是，按图层切图会大量消耗服务器资源，可能会存在出图慢、无法渲染等不确定情况。"
    },
    {
      questionTitle: "Q2：什么是切图区域？",
      answer: "A:即地图中间件按照所选区域切图，服务申请者可区域申请服务。"
    }
  ],
  guideList: [
    {
      guideTitle: "服务的注册",
      guideContent: [
        {
          value:
            "1、服务需满足的条件：①服务发布在管线专网内的服务器上；②服务类型为ARCGIS的矢量地图服务、切片地图服务、注记服务中的任一种；③服务稳定，能够满足平台用户日常访问的需求。"
        },
        {
          value:
            "2、服务注册入口：①首页-注册资源 ②个人中心-我注册的资源-注册资源。"
        },
        {
          value:
            "3、服务注册的步骤：点击注册服务-填写服务信息-提交-平台管理员审核-审核通过-地图中间件转发切图-平台共享审核不通过-修改信息重新提交。"
        }
      ]
    },
    {
      guideTitle: "服务的申请与使用",
      guideContent: [
        {
          value:
            "1、服务的申请：在资源超市中按需申请服务，当该服务需要审批时，需要等待服务提供方审批，审批进度可在【个人中心】-【我申请的服务】中跟踪查看；当服务不需要审批时，申请后可直接使用。"
        },
        {
          value:
            "2、服务的使用：①在平台【服务一张图】中查看，支持与其他服务叠加。②根据注册账号时得到的KEY值调用服务。"
        }
      ]
    },
    {
      guideTitle: "数据的申请与下载",
      guideContent: [
        {
          value:
            "在资源超市在按需申请服务，申请后需等待服务提供方审批，审批进度可在【个人中心】-【我申请的数据】中查看和下载数据。申请范围支持行政区划、绘制范围线、上传范围线三种方式。"
        }
      ]
    }
  ]
};

export default Config;
