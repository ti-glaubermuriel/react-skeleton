import React, { Component } from 'react';
import {
    Card, Spin, Button, Tooltip
} from "antd";
import api from "../../services/api";
import {ConvertSecondsToHourMinute} from "../../Utils";

class IndicatorSRPA extends Component {

    state = {
        loading: true,
        value: null,
        listConvenios: []
    }

    loadData = () => {

        this.setState({ 'loading': true, value: null, listConvenios: null });

        const obj = {
            institution: {
                id: 348,
                active: true,
                uuid: "2BD499B3-81C6-4F2F-ACFB-BC8696946FBB"
            },
            period: ["2018-12-01", "2018-12-14"],
            user: {
                id: 1,
                uuid: "e500ffc7-1a51-4e8d-a72b-ed709a0cd7e5",
                email: "admin@anestech.com.br",
                active: true,
                type: "AD",
                anaesthetist_id: null,
                anaesthetist: null
            }
        };

        api
            .post("dashboard/total/srpa/", obj)
            .then(res => {

                this.setState({
                    loading: false,
                    value: ConvertSecondsToHourMinute(res.data)
                });


            })
            .catch(error => {
                console.log(error);
            });


    };
    
    
    componentWillReceiveProps(nextProps) {
        if (this.props.filters.period !== nextProps.filters.period) {
            this.loadData();
        }
    };

    componentDidMount() {
        this.loadData();
    };

    render() {
        return (
            <div>
                <Card className="card-indicator">
                    <div className="card-details">
                        <Tooltip placement="topLeft" title="Visualizar detalhes">
                            <Button shape="circle" icon="search" className="btn-card-details" />
                        </Tooltip>
                    </div>
                    <div className="card-number">
                        <span>
                            <Spin className="ant-spin-lg" spinning={this.state.loading}>
                                {this.state.value}
                            </Spin>
                        </span>
                    </div>
                    <div className="card-sub-title">
                    Tempo médio em SRPA
                        </div>
                        <div className="card-info">
                        <Tooltip placement="topLeft" title="Tempo médio de permanência na sala de recuperação pós-anestésica.">
                        <Button shape="circle" icon="info" className="btn-card-details" />
                        </Tooltip>
                    </div>
                </Card>
            </div>
        );
    }
}

export default IndicatorSRPA;