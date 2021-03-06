import React, { Component } from "react";
import { Card, Spin } from "antd";

class IndicatorPacientes extends Component {
  state = {
    loading: true,
    valor: ""
  };

  loadData = () => {
    this.setState({ loading: true, valor: "" });

    setTimeout(() => {
      this.setState({
        loading: false,
        valor: parseInt(Math.floor(Math.random() * 100 + 1))
      });
    }, 500);
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
    return (
      <div>
        <Card className="card-indicator">
          <div className="card-number">
            <span>
              <Spin className="ant-spin-lg" spinning={this.state.loading}>
                &nbsp;
                {this.state.valor}
              </Spin>
            </span>
          </div>
          <div className="card-sub-title">Pacientes</div>
        </Card>
      </div>
    );
  }
}

export default IndicatorPacientes;
