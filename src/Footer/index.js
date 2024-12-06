import { Col, Menu, Row } from 'antd'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined
} from '@ant-design/icons';
import './styles.css'
const Footer = () => {
  return (
    
      <footer className="footer">
        <div className='container'>
          <Row justify="space-between">
            <Col xs={24} sm={12} md={6}>
              <h4 className="footer-heading">FinanceApp</h4>
              <p>Manage your finances efficiently with our app. Secure, simple, and smart financial tools for everyone.</p> 
            </Col>
            <Col xs={24} sm={12} md={6}>
              <h4 className="footer-heading">Quick Links</h4>
              <Menu mode="vertical" className="footer-menu">
                <Menu.Item key="1"><a href="#">Dashboard</a></Menu.Item>
                <Menu.Item key="2"><a href="#">Budgets</a></Menu.Item>
              <Menu.Item key="3"><a href="#">Investments</a></Menu.Item>
              <Menu.Item key="4"><a href="#">Reports</a></Menu.Item>
              </Menu>
            </Col>

            <Col xs={24} sm={12} md={6}>
            <h4 className="footer-heading">Help & Support</h4>
            <Menu mode="vertical" className="footer-menu">
              <Menu.Item key="5"><a href="#">FAQs</a></Menu.Item>
              <Menu.Item key="6"><a href="#">Contact Us</a></Menu.Item>
              <Menu.Item key="7"><a href="#">Privacy Policy</a></Menu.Item>
              <Menu.Item key="8"><a href="#">Terms of Service</a></Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FacebookOutlined className="social-icon" /></a>
              <a href="#"><TwitterOutlined className="social-icon" /></a>
              <a href="#"><InstagramOutlined className="social-icon" /></a>
              <a href="#"><LinkedinOutlined className="social-icon" /></a>
            </div>
          </Col>
          </Row>
          <Row justify="center" className="footer-bottom">
          <Col xs={24}>
            <p>&copy; 2024 FinanceApp. All rights reserved.</p>
          </Col>
        </Row>
        </div>
      </footer>
  ) 
}

export default Footer