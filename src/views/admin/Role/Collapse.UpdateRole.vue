<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import roleService from '../../../services/role.service';
import { paginatePermissionApi } from '../../../services/permission.service';
import useRoleStore from '../../../stores/admin/RoleStore';

const store = useRoleStore()
const activeKey = ref<string[]>(['1']);
const checkedPermissions = ref<Record<string, boolean>>({});
// const data = ref<any[]>([]); // Thay đổi thành mảng để chứa nhiều mục


// Cấu trúc dữ liệu để nhóm dữ liệu
const groupedData = ref<Record<string, any[]>>({});
const getData = async () => {
    try {
        const res = await paginatePermissionApi('?current=1&pageSize=100');

        const data = res.result;

        // Nhóm dữ liệu theo module
        const grouped: Record<string, any[]> = {};
        data.forEach((item: any) => {
            if (!grouped[item.module]) {
                grouped[item.module] = [];
            }
            grouped[item.module].push(item);

            // Khởi tạo trạng thái đã chọn
            if (!checkedPermissions.value[item._id]) {
                checkedPermissions.value[item._id] = store.form.permissions.includes(item._id);
            }
        });

        groupedData.value = grouped;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
};

// Xử lý sự thay đổi của switch
const handleSwitchChange = (id: string, checked: boolean) => {
    if (checked) {
        // Thêm id vào form.permissions
        if (!store.form.permissions.includes(id)) {
            store.form.permissions.push(id);
        }
    } else {
        // Xóa id khỏi form.permissions
        store.form.permissions = store.form.permissions.filter(permissionId => permissionId !== id);
    }

    // Cập nhật trạng thái đã chọn
    checkedPermissions.value[id] = checked;
    console.log(store.form.permissions)
};

const renderColorMethod = (method: string) => {
    switch (method) {
        case 'DELETE':
            return 'text-[#B53535]'
        case 'GET':
            return 'text-[#1E8647]'
        case 'POST':
            return 'text-[#FCC816]'
        case 'PUT':
            return 'text-[#3E8DEE]'
        case 'PATCH':
            return 'text-[#8D35B3]'
        case 'HEAD':
            return 'text-[#256565]'
        case 'OPTIONS':
            return 'text-[#A03E75]'
        default:
    }
}

onMounted(() => {
    getData();
});


watch(() => store.form._id, () => {
    activeKey.value = ['1'];
    groupedData.value = {};
    checkedPermissions.value = {}
    getData();
})


</script>

<template>
    <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel v-for="(items, module) in groupedData" :key="module" :header="module">
            <a-row :gutter="16">
                <a-col v-for="item in items" :key="item._id" :span="12" class="py-2">
                    <a-card style="width: 100%">
                        <div class="flex h-full items-center gap-x-1">
                            <a-switch :checked="checkedPermissions[item._id]"
                                @change="(checked: boolean) => handleSwitchChange(item._id, checked)" />
                            <div class="pl-2">
                                <div class="w-full text-base">{{ item.name }}</div>
                                <div class="text-[13px]">
                                    <span :class="'mr-2 font-bold  ' + renderColorMethod(item.method)">
                                        {{ item.method }}</span>
                                    <span>{{ item.apiPath }}</span>
                                </div>
                            </div>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </a-collapse-panel>
    </a-collapse>
</template>



<style>
.ant-collapse-content-box {
    padding: 5px !important
}

.ant-card-body {
    padding: 15px !important
}
</style>