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

class CarouselIndicators extends Component {
    render() {

        const settingsCorousel = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
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
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                          <div className="card-number">
                            <span>340</span>
                          </div>
                          <div className="card-sub-title">
                            Pacientes
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                        <div className="card-details">
                        <Button shape="circle" icon="search" className="btn-card-details" />
                        </div>
                          <div className="card-number">
                            <span>414</span>
                          </div>
                          <div className="card-sub-title">Convênios</div>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                          <div className="card-number">
                            <h2>34</h2>
                          </div>
                          <div className="card-sub-title">Eventos adversos</div>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                          <div className="card-number">
                            <h2>53</h2><small>h</small>
                          </div>
                          <div className="card-sub-title">
                            Turnover médio de salas
                          </div>
                        </Card>
                      </div>
                    </div>

           

                    <div>
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                          <div className="card-number">
                            <h2>
                              13 <small>%</small>
                            </h2>
                          </div>
                          <div className="card-sub-title">
                            Salas em atividade
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <div style={{ padding: "0px 25px 10px 25px" }}>
                        <Card className="card-indicator">
                          <div className="card-number">
                            <h2>
                              2 <small>hr</small>
                            </h2>
                          </div>
                          <div className="card-sub-title">
                            Tempo médio em SRPA
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Slider>
                
            </div>
        );
    }
}

export default CarouselIndicators;