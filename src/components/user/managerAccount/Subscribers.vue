<template>
    <div class="w-11/12 lg:w-10/12 mx-auto">
        <a-form :model="formModel" name="basic" layout="vertical" autocomplete="off" @finish="onFinish">
            <a-form-item label="Kỹ năng" name="skills">
                <a-select v-model:value="formModel.skills" allowClear mode="tags" style="width: 100%"
                    placeholder="Vui lòng chọn kĩ năng..." :options="SKILLS_LIST">
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" :disabled="formModel.skills.length === 0">Xác
                    nhận</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { SKILLS_LIST } from '../../../until/until';
import { message } from 'ant-design-vue';
import subscriberService from '../../../services/subscriber.service';
import accountService from '../../../constant/account.service';

const { account } = accountService.getAccount();
const formModel = ref({
    skills: []
});



const getSkills = async () => {
    debugger
    const res = await subscriberService.getByEmailApi(account?.email);
    if (res.data) {
        formModel.value.skills = res.data.skills
    }
}

const onFinish = async (values: any) => {
    const data = {
        skills: values.skills,
        name: account?.name,
        email: account?.email
    }
    const res = await subscriberService.createOrUpdateApi(data);
    if (res.data) {
        message.success('Đăng ký thành công')
        getSkills()
    }
};

onMounted(() => {
    getSkills()
})


</script>
