<template>
    <div id="UEtor">
        <script id="editor" type="text/plain"></script>
    </div>
</template>   

<script>
export default {
    name: "Ue",
    props:{
        defaultMsg:{type:String},
        config:{type:Object}
    },
    data() {
        return{
            editor:null
        }
    },
    mounted() {
        UE.delEditor('editor'); 
        const _this = this;
        _this.editor = UE.getEditor('editor', _this.config); // 初始化UE
        _this.editor.addListener("ready", function () {
            setTimeout(function(){
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            },1000)
        });
        // this.editor.render('editor');
    },
     methods: {
     //获取编辑器中的内容
      getUEContent () {
        return this.editor.getContent()
      }
    },
    destroyed() {
      // 将editor进行销毁
      this.editor.destroy();
    }
}
</script>
