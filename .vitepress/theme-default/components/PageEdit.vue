<template>
  <div>
    <footer class="page-edit">
      <a v-for="(item,index) in data.platform" :key="index" :href="item.href">
        <img class="imgIcon" :src="item.icon" />
      </a>
    </footer>
    <p class="platform">
      以上皆为
      <a href="javascript:;">Journey&Flower</a> 文章发布平台
    </p>
    <p class="platform">
      Copyright &copy; 2020-2021
      <a href="https://github.com/JourneyFlower">@Journey&Flower</a>
    </p>
  </div>
</template>

<script>
import juejin from "../../images/juejin.png"
export default {
  setup() {
    const data = {
      platform: [
        { href: "https://juejin.cn/user/3175045313607534", icon: juejin },
      ]
    }
    return {
      data
    }
  }
}
</script>

<style>
.platform {
  text-align: center;
}
.platform > a {
  color: #2196f3;
}
.page-edit {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-edit a {
  color: var(--text-color);
  margin-right: 0.25rem;
  display: inline-block;
  margin: 0 0.2rem;
}
.imgIcon {
  width: 1.5rem;
  border-radius: 50%;
}
</style>
