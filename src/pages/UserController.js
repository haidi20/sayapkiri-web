import { http } from '@/http.js';
import moment from 'moment';
import MainLayout from '@/pages/MainLayout';

const initialState = () => {
    return {
        pid_user: null,
        nama: null,
        email: null,
        no_telp: null,
        register_date: null,
    };
}
export default {
    data() {
        return {
            loading: false,
            form: initialState(),
            dataRows: [],
            request: {
                offset: 0,
                limit: 10,
                search: null
            },
            paginationOptions: {
                perPage: 15,
                enabled: true,
                mode: 'pages',
                perPageDropdown: [15, 20, 50, 100],
            },
            columns: [{
                label: 'Action',
                field: 'btnAction',
                html: true,
            }, {
                label: 'Nama',
                field: 'nama',
            }, ],
            rows: [{
                btnAction: `<td class="border px-5 py-4 text-xs">
                                    <img @click="onEdit(item.pid_user)" width="20" style="display: inline" class=" cursor-pointer " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVRIie3VPU7DMBjG8b8DO2JF/WBh5BQggZyZA3CB0sIACyKVkICF5AaMsDCSihswcAIWSAoDI1On5mWAorRp0qbYnfpsiZ38/PHGgUXmFGXjpTqIW8Ap8EHCfnhYe7YOaz/yUOosJXyJcnY7jcqTNTiDpnD6bKdn7piEcyOs4HCTvmUUDlt1D5F2TvOaUVj7kaf9yJsCP09f/GuP03sqqKtOs3oyaHOD6FhQlz+K8sKD6tBgZobHFpJIO2zVvaE+/K7CSGaCc6uX7MzzUhouQsvgpYprGhRAKXoT+5hGxxXSzLBpdCrYBjoRtoUWwjbRXNgN4h2BW2C18OmRA6NMxn5OD83ao0I1bKG5MICQfNpCC2H6S5EtNAPr6+7m38F+VHnpJ2pDJNkSkT2gZwrNRAfdCx3Ekv6/DuL6b65Ja6iqdRC/AuuAsSXNy/LIKN4FBMUdiXNvC11krvkGRtWpyp1myeYAAAAASUVORK5CYII="/>
                                    <img @click="onRemove(item.pid_user)" width="20" style="display: inline" class="float-right cursor-pointer "  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZElEQVRIiWNgGOqAkRhFP428Ghj/M9Qji/1n+N/Jfn57BckW/DL0+k+8+zAB2/ltKGYyUWLYyABYI5nceEAPfwYGOsQBQQvYzm9jxOYyXOIkW0ApGLVg1IJRC+hgwdAv7IY+AABHeRpR7gJWRgAAAABJRU5ErkJggg=="/>
                                </td>`,
            }]
        };
    },
    components: {
        MainLayout,
    },
    mounted() {
        this.getData();
    },
    created() {
        this.form.register_date = moment().format('YYYY-MM-DD');
    },
    methods: {
        async getData() {
            let that = this;
            this.loading = true;
            this.dataRows = {};

            await http("api/user/getAllUser", this.request)
                .then(responses => {
                    let data = responses.data.data;

                    if (responses.status) {
                        that.dataRows = data;
                    }

                    that.loading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async onSubmit() {
            let that = this;
            this.loading = true;

            if (this.form.nama == null || this.form.email == null || this.form.no_telp == null) {
                this.loading = false;
                this.$swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2000,
                    })
                    .fire({
                        icon: "warning",
                        title: "Maaf, form todak boleh kosong",
                    });

                return false;
            }

            await http("api/user/store", this.form)
                .then(function(responses) {
                    let data = responses.data;

                    if (data.status != undefined && data.status) {
                        that.$swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timerProgressBar: true,
                                timer: 2000,
                            })
                            .fire({
                                icon: "success",
                                title: data.remark
                            });
                    } else if (data.status != undefined && !data.status) {
                        that.$swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timerProgressBar: true,
                                timer: 2000,
                            })
                            .fire({
                                icon: "warning",
                                title: data.remark
                            });

                        console.log(data.remark);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.form = initialState();
                    this.loading = false;
                    this.getData();
                });
        },
        async onRemove(pid_user) {
            let that = this;
            let foundData = this.table.data.filter(item => item.pid_user == pid_user)[0];

            return await this.$swal.fire({
                icon: 'question',
                title: `Do you want to delete user <b>${foundData.nama}</b> ?`,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    http("api/user/delete", foundData)
                        .then(function(responses) {
                            let data = responses.data;

                            if (data.status != undefined && data.status) {
                                that.$swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timerProgressBar: true,
                                        timer: 2000,
                                    })
                                    .fire({
                                        icon: "success",
                                        title: data.remark
                                    });

                                that.getData();
                            } else if (data.status != undefined && !data.status) {
                                that.$swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timerProgressBar: true,
                                        timer: 2000,
                                    })
                                    .fire({
                                        icon: "warning",
                                        title: data.remark
                                    });

                                console.log(data.remark);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
        onEdit(pid_user) {
            // let that = this;        
            let foundData = this.table.data.filter(item => item.pid_user == pid_user)[0];

            this.form.pid_user = foundData.pid_user;
            this.form.nama = foundData.nama;
            this.form.email = foundData.email;
            this.form.no_telp = foundData.no_telp;
            this.form.register_date = moment(foundData.register_date).format('YYYY-MM-DD');
        },
        resetForm() {
            this.form = initialState();
        }
    }
}