import React, { Component } from 'react';
import {
    Card, Spin, Button
} from "antd";
import api from "../../services/api";
import {getRequestFilters} from "../../services/filters";



class IndicatorConvenios extends Component {
    state = {
        loading: true,
        value: null,
        listConvenios: []
    }

    loadData = () => {

        this.setState({ 'loading': true, value: null, listConvenios: null });
        let objFilters = getRequestFilters();

        api
            .post("dashboard/medical_plans/", objFilters)
            .then(res => {
                this.setState({
                    loading: false,
                    value: res.data.total.toString()
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
    };
 

    componentDidMount() {

        if (this.props.lastfilter) {
            this.loadData();
        }  

    };

    render() {
        return (
            <div>
                <Card className="card-indicator">
                <div className="card-details">
                  <Button shape="circle" icon="search" className="btn-card-details" />
                </div>
                    <div className="card-number">

                        <span>
                            <Spin className="ant-spin-lg" spinning={this.state.loading}>
                                {this.state.value}
                            </Spin>
                        </span>

                    </div>
                    <div className="card-sub-title">
                        Convênios
                        </div>
                </Card>
            </div>
        );
    }
}

export default IndicatorConvenios;