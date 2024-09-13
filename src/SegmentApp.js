import React, { useState } from 'react';
import { Button } from 'antd'; 
import SegmentDrawer from './SegmentDrawer';
import 'antd/dist/reset.css';

const SegmentApp = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button
        type="primary"
        onClick={() => setDrawerVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        Save Segment
      </Button>
      <SegmentDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </div>
  );
};

export default SegmentApp;
