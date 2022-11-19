<template>
  <div id="gitalk-container"></div>
</template>

<script>
export default {
  name: "blog-comments",
  mounted() {
    const commentConfig = {
      //https://github.com/settings/applications/new
      // 是否开启
      enable: true,
      // clientID
      clientID: "60361cd0303751afd7fe",
      // clientSecret
      clientSecret: "66cfc14c7355e1d51d3b29122e2a47c77407c41e",
      // 评论项目名
      repo: 'blog-comments',
      owner: 'JourneyFlower',
      admin: ['JourneyFlower'],
      //githubID: 'JourneyFlower',
      id: decodeURI(window.location.pathname),
      language: 'zh-CN',
      distractionFreeMode: true
    };
    const gitalk = new Gitalk(commentConfig);
    gitalk.render("gitalk-container");
  },
};
</script>