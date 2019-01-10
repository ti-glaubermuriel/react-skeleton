import React, { Component } from "react";
import { Button, Card, Spin, Table } from "antd";
import api from "../services/api";
import { getRequestFilters } from "../services/filters";

const { Column } = Table;


class TableProcedures extends Component {
    state = {
        loading: true,
        data: []
    };

    loadData = () => {
        this.setState({ loading: true });
        let objFilters = getRequestFilters();

        api
            .post("dashboard/procedures_rank/", objFilters)
            .then(res => {
                const newData = [];
                res.data.labels.forEach(function (value, index) {
                    let time_anesthetic = res.data.tooltips[index][0];
                    let time_surgery = res.data.tooltips[index][1];

                    newData.push({
                        procedure: value,
                        time_anesthetic: time_anesthetic,
                        time_surgery: time_surgery,
                        value: res.data.values[index]
                    });
                });

                this.setState({
                    loading: false,
                    data: newData
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.lastfilter !== nextProps.lastfilter) {
            this.loadData();
        }
    }

    componentDidMount() {
        if (this.props.lastfilter) {
            this.loadData();
        }
    }

    render() {
        const columns = [{
            title: 'Procedimento',
            dataIndex: 'procedure',
            render: procedure => <span class="column-letter">{procedure}</span>
        }, {
            title: '',
            dataIndex: 'time_surgery',
            width: 280,

        }, {
            title: '',
            dataIndex: 'time_anesthetic',
            width: 280
        },
        {
            title: 'Quantidade',
            dataIndex: 'value',
            width: 120
        }
        ];

        return (
            <div>
                <Card
                    style={{ minHeight: 445, width: "100%" }}
                    title="Procedimentos realizados no período"
                >
                    <Spin className="ant-spin-lg" spinning={this.state.loading}>

                        <Table size="midle" className="table-procedure" columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 445 }} />,
              
          </Spin>
                </Card>
            </div>
        );
    }
}

export default TableProcedures;
