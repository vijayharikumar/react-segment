import React, { useState, useCallback, useEffect } from 'react';
import { Drawer, Button, Input, Select, Form, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Option } = Select;

const colorPalette = [
  '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1',
  '#F5B7B1', '#F7DC6F'
];

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

const getDefaultColor = (index) => colorPalette[index % colorPalette.length];

const BulletPoint = React.memo(({ color }) => (
  <div
    style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: color,
      marginRight: '8px',
    }}
  />
));

const SegmentDrawer = ({ visible, onClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  useEffect(() => {
    if (visible && selectedSchemas.length === 0) {
      handleAddNewSchema();
    }
  }, [visible, selectedSchemas]);

  const getAvailableOptions = useCallback(() => {
    const selectedValues = new Set(selectedSchemas.map(schema => schema.value));
    return schemaOptions.filter(option => !selectedValues.has(option.value));
  }, [selectedSchemas]);

  const availableOptions = getAvailableOptions();

  const handleSegmentNameChange = (e) => setSegmentName(e.target.value);

  const handleAddNewSchema = () => {
    setSelectedSchemas(prevSchemas => [
      ...prevSchemas,
      { value: '', label: '', color: getDefaultColor(prevSchemas.length) }
    ]);
  };

  const handleSchemaChange = (index, value) => {
    setSelectedSchemas(prevSchemas => {
      const updatedSchemas = [...prevSchemas];
      const selectedOption = schemaOptions.find(option => option.value === value);
      updatedSchemas[index] = { ...selectedOption, color: updatedSchemas[index].color };
      return updatedSchemas;
    });
  };

  const handleRemoveSchema = (index) => {
    setSelectedSchemas(prevSchemas => prevSchemas.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const schema = selectedSchemas.map(({ value, label }) => ({ [value]: label }));
    const data = {
      segment_name: segmentName,
      schema: schema
    };
    console.log('Data to send:', data);
    setSegmentName('');
    setSelectedSchemas([]);
    onClose();
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', color: "white" }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              onClose();
              setSegmentName('');
              setSelectedSchemas([]);
            }}
            style={{ marginRight: '16px', color: 'white' }}
          />
          Saving Segment
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={visible}
      width={400}
      headerStyle={{ padding: '13px 16px', display: 'flex', alignItems: 'center', backgroundColor: "#1677ff" }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)' }}>
        <Form layout="vertical" style={{ flex: 1 }}>
          <Form.Item label="Enter the Name of the Segment">
            <Input
              value={segmentName}
              onChange={handleSegmentNameChange}
              placeholder='Name of the segment'
            />
          </Form.Item>

          <Row style={{ marginBottom: "20px" }}>
            To save your segment, you need to add the schemas to build the query
          </Row>

          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Col style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
              <BulletPoint color='#88B04B' /> - User Traits
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <BulletPoint color='#F5B7B1' /> - Group Traits
            </Col>
          </Row>

          <div className="schemas-container mb-3">
            {selectedSchemas.map((schema, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginTop: '20px' }}>
                <BulletPoint color={schema.color} />
                <Form.Item style={{ flex: 1, margin: 0 }}>
                  <Select
                    value={schema.label || undefined}
                    onChange={(value) => handleSchemaChange(index, value)}
                    placeholder="Add schema to segment"
                    style={{ width: '100%' }}
                  >
                    {availableOptions.map(option => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="text"
                  danger
                  icon={<span style={{ fontSize: '16px', lineHeight: '1' }}>–</span>}
                  onClick={() => handleRemoveSchema(index)}
                  style={{ marginLeft: '8px' }}
                />
              </div>
            ))}
            <Button
              style={{
                marginTop: '10px',
                marginLeft: '20px',
                color: '#1677ff',
                border: 'none',
                padding: 0,
                fontSize: '14px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
              type="link"
              onClick={handleAddNewSchema}
            >
              + Add new schema
            </Button>
          </div>
        </Form>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            backgroundColor: '#fff',
            borderTop: '1px solid #e8e8e8',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={() => {
            onClose();
            setSegmentName('');
            setSelectedSchemas([]);
          }}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>Save the segment</Button>
        </div>
      </div>
    </Drawer>
  );
};

export default SegmentDrawer;
