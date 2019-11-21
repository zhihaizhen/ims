import CommonIcon from '_c/common-icon';
import { showTitle } from '@/util';
export default {
    components: {
        CommonIcon
    },
    methods: {
        showTitle(item) {
            return showTitle(item, this);
        },
        showChildren(item) {
            return item.children && item.children.length > 1;
        },
        getNameOrHref(item, children0) {
            return item.code;
        }
    }
};
