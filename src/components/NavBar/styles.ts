import styled from 'styled-components';

export const Container = styled.div`
  #page-wrap {
    text-align: center;

    /* Prevent sidebar from showing a scrollbar on page */
    overflow: auto;
  }

  /* Individual item */
  .bm-item {
    display: flex !important;
    align-items: center !important;

    /* Our sidebar item styling */
    text-decoration: none;
    margin-bottom: 24px;
    color: #333333;
    transition: color 0.2s;

    a {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    svg {
      margin-right: 16px;
      width: 16px;
      height: 16px;
    }
  }

  .selected {
    color: #ff6752;
  }
  /* Change color on hover */
  .bm-item:hover {
    color: #ff6752;
  }

  /* The rest copied directly from react-burger-menu docs */

  /* Position and sizing of burger button */
  .bm-burger-button {
    position: absolute;
    width: 24px;
    height: 16px;
    left: 36px;
    top: 17.5px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #fff;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #fafafa;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  .bordertop {
    border-top: 1px solid rgba(70, 70, 70, 0.2);
    margin-top: 36px;
    padding-top: 36px;
  }
`;
