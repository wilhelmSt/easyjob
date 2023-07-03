import { Button, Input, Space, Table } from "antd"
import type { InputRef } from "antd"
import type { ColumnsType, ColumnType } from "antd/es/table"
import { useState, useRef } from "react"
import { SearchOutlined, WhatsAppOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import styles from './styles/teacherTable.module.css'

export default function TeacherTable(): JSX.Element {
  interface DataType {
    key: string | number;
    name: string;
    materia: string;
    time: string;
    city: string;
    price: string;
    description: string;
    number: string;
  }

  type DataIndex = keyof DataType;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
    isClear?: boolean
  ) => {confirm();
    setSearchText(selectedKeys[0]);
    !isClear ? setSearchedColumn(dataIndex) : setSearchedColumn('');
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex, true);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Resetar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtro
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        <span className={styles.spanName}>{text}</span>
      ),
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Matéria',
      dataIndex: 'materia',
      key: 'materia',
      ...getColumnSearchProps('materia')
    },
    {
      title: 'Horário',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time')
    },
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city')
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price')
    }
  ]

  const data: DataType[] = [
    {
      key: 1,
      name: 'John Brown',
      materia: 'Matemática',
      time: '8:00 - 12:00',
      city: 'São Paulo',
      price: 'R$ 50,00',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      number: '85998096663'
    },
    {
      key: 2,
      name: 'Jim Green',
      materia: 'Português',
      time: '13:00 - 17:00',
      city: 'Fortaleza',
      price: 'R$ 50,00',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      number: '123456789'
    }
  ]

  return (
    <>
      <Table
        id="teacherTable"
        className={styles.table}
        columns={columns}
        dataSource={data}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p style={{ margin: 0 }}>{record.description}</p>
              <span><strong><WhatsAppOutlined /> Whatsapp: </strong></span>
              <a
                className={styles.numberClick}
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${record.number}`}
              >
                {record.number}
              </a>
            </>
          )
        }}
      />
    </>
  )
}