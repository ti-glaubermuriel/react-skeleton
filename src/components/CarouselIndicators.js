import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Button,
  Icon,
  Select,
  Card,
  Row,
  Col,
  Avatar,
  Spin,
  Dropdown,
  Divider,
  DatePicker,
  Tag,
  List
} from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IndicatorPacientes from "./indicators/IndicatorPacientes";
import IndicatorConvenios from "./indicators/IndicatorConvenios";
import IndicatorAdverseEvents from "./indicators/IndicatorAdverseEvents";
import IndicatorTurnover from "./indicators/IndicatorTurnover";
import IndicatorSRPA from "./indicators/IndicatorSRPA";





class CarouselIndicators extends Component {


  render() {

    const settingsCorousel = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ],
      autoplay: false,
      autoplaySpeed: 5000
    };


    return (
      <div>

        <Slider {...settingsCorousel}>
          <div>
            <div style={{ padding: "0px 15px 10px" }}>
              <IndicatorPacientes lastfilter={this.props.lastfilter} />
            </div>
          </div>

          <div>
            <div style={{ padding: "0px 15px 10px" }}>
              <IndicatorConvenios lastfilter={this.props.lastfilter} />
            </div>
          </div>

          <div>
            <div style={{ padding: "0px 15px 10px" }}>
            <IndicatorAdverseEvents lastfilter={this.props.lastfilter} />
            </div>
          </div>

          <div>
            <div style={{ padding: "0px 15px 10px" }}>
             <IndicatorTurnover lastfilter={this.props.lastfilter} />
            </div>
          </div>



          <div>
            <div style={{ padding: "0px 15px 10px" }}>
              <IndicatorSRPA lastfilter={this.props.lastfilter} />
            </div>
          </div>

        </Slider>

      </div>
    );
  }
}

export default CarouselIndicators;