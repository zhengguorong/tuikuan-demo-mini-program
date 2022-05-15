
<script lang="tsx">
import IconEmpty from "@/assets/images/icon_empty.png";
import { defineComponent } from "vue";
import { Image, View } from '@tarojs/components'
import './index.scss'

export default defineComponent({
  props: {
    content: String,
  },
  setup() {

  },
  // render需要直接调用组件，例如Image不要用image，否则会导致类型提示问题
  render(props) {
    return (
      <View class="empty container">
        <Image src={IconEmpty} class="icon" />
        <View class="desc" > {props.content} </View>
      </View>
    );
  }
});
</script>