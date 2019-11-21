import { mapActions} from 'vuex';
export default {
    activated() {
        let name = this.$route.name;
        let current = this.$store.state.keepAlive.includeComponentsName.find(i => {
            return i.name === name;
        });
        if(current && current.isKeep === false) {
            // 初始化数据
            this.initData();
        }
    },
    methods: {
        ...mapActions(['editIncludeComponentsName']),
        changeKeep(name, bl) {
            this.editIncludeComponentsName({
                name: name,
                isKeep: bl
            });
        }
    }
};
