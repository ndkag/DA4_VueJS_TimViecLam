<script lang="ts" setup>


import { onMounted, ref, watch, watchEffect } from 'vue';
import type { IPaginate } from '../../../types/backend';
import dayjs from 'dayjs';
import UpdatePermison from './UpdatePermison.vue';
import usePermissionStore from '../../../stores/admin/PermissionStore';
import { message } from 'ant-design-vue';


const store = usePermissionStore()

const columns = [
    {
        title: 'STT',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
    },
    {
        title: 'Địa chỉ API',
        dataIndex: 'apiPath',
    },
    {
        title: 'Thuộc tính',
        dataIndex: 'method',
    },
    {
        title: 'Module',
        dataIndex: 'module',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: 'Thao tác',
        dataIndex: '_id',
    }
];

const handleTableChange = (pagination: IPaginate) => {
    store.dataMeta.current = pagination.current;
    store.dataMeta.pageSize = pagination.pageSize;
    store.getData();
};




const renderColorMethod = (method: string) => {
    switch (method) {
        case 'DELETE':
            return 'red'
        case 'GET':
            return 'green'
        case 'POST':
            return 'gold'
        case 'PUT':
            return 'blue'
        case 'PATCH':
            return 'purple'
        case 'HEAD':
            return 'cyan'
        case 'OPTIONS':
            return 'magenta'
        default:
    }
}

onMounted(() => {
    store.getData()
})


</script>
<template>
    <a-layout-header :style="{ background: '#fff', padding: '0 20px' }" class="p-0 text-lg font-medium">Trang quản lý
        phân quyền</a-layout-header>
    <a-layout-content style="margin: 0 16px">

        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Trang chủ</a-breadcrumb-item>
            <a-breadcrumb-item>Quản lý quyền</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="p-6 bg-white min-h-[360px] rounded-[10px]">
            <div class="flex justify-between">

                <a-input-search placeholder="Vui lòng nhập thông tin cần tìm kiếm" enter-button="Tìm kiếm"
                    v-model:value="store.valueSearch" @search="store.getData(store.valueSearch)" class="w-2/3" />
                <button class="bg-[#21aa55] hover:bg-green-500 text-white rounded-[7px] px-5 font-medium "
                    @click="store.handleOpenModal()">Thêm
                    mới</button>
            </div>

            <div class="mt-3 border rounded-[10px]">
                <a-table :columns="columns" :data-source="store.data" :loading="store.load" :pagination=store.dataMeta
                    @change="handleTableChange">
                    <template #bodyCell="{ column, text, index }">
                        <template v-if="column.title === 'STT'">
                            {{ ((store.dataMeta.current || 1) - 1) * (store.dataMeta.pageSize || 6) + index + 1 }}
                        </template>
                        <template v-else-if="column.dataIndex === 'createdAt'">
                            {{ dayjs(text).format('DD/MM/YYYY [lúc] HH:mm:ss') }}
                        </template>

                        <template v-else-if="column.dataIndex === 'method'">
                            <span>
                                <a-tag :color="renderColorMethod(text)">
                                    {{ text.toUpperCase() }}
                                </a-tag>
                            </span>
                        </template>
                        <template v-else-if="column.dataIndex === '_id'">
                            <button type="button"
                                class="mr-2  bg-[#1669dcec] hover:bg-[#498ff1] rounded-[5px] px-[10px] py-1 h-8 "
                                @click="store.getByID(text)">
                                <img class=" h-5/6" src="../../../assets/image/icon/icons8_settings.svg" alt="">
                            </button>
                            <a-popconfirm title="Bạn có chắc muốn xoá?" ok-text="Có" cancel-text="Không"
                                :loading="store.load" @confirm="store.deleteByID(text)" @cancel="">
                                <button type="button"
                                    class=" bg-red-500 hover:bg-red-400 rounded-[5px] px-[10px] ] py-1 h-8 ">
                                    <img class="h-5/6" src="../../../assets/image/icon/icons8_remove.svg"
                                        alt=""></button>
                            </a-popconfirm>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-layout-content>
    <UpdatePermison> </UpdatePermison>
</template>