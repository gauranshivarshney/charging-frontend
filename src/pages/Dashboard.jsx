import { useEffect, useState } from 'react';
import axios from '../api/axios';
import styles from './dashboard.module.css';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    connectorType: '',
    minPower: ''
  });
  const [form, setForm] = useState(null);
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchStations = async () => {
    const { data } = await axios.get('/stations', { params: filters });
    setStations(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await axios.put(`/stations/${form._id}`, form);
    } else {
      await axios.post('/stations', form);
    }
    setForm(null);
    fetchStations();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/stations/${id}`);
    fetchStations();
  };

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Charging Stations</h2>
        <div>
          <button onClick={() => navigate('/map')} className={styles.mapButton}>View Map</button>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </div>
      </div>
      <div className={styles.filters}>
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <input type="number" placeholder="Min Power" onChange={(e) => setFilters({ ...filters, minPower: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })}>
          <option value="">Select Connector</option>
          <option value="CCS">CCS</option>
          <option value="CHAdeMO">CHAdeMO</option>
          <option value="Type2">Type2</option>
          <option value="Tesla">Tesla</option>
        </select>
        <button onClick={fetchStations}>Filter</button>
      </div>
      <button onClick={() => setForm({})} className={styles.addButton}>Add New</button>
      <div className={styles.grid}>
        {stations.map(station => (
          <div key={station._id} className={styles.card}>
            <h3>{station.name}</h3>
            <p>Status: {station.status}</p>
            <p>Power: {station.powerOutput} kW</p>
            <p>Connector: {station.connectorType}</p>
            <div className={styles.actions}>
              <button onClick={() => setForm(station)}>Edit</button>
              <button onClick={() => handleDelete(station._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {form && (
        <div className={styles.overlay}>
          <form onSubmit={handleSubmit} className={styles.popupForm}>
            <input placeholder="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Latitude" value={form?.location?.lat || ''} onChange={(e) => setForm({ ...form, location: { ...form.location, lat: e.target.value } })} />
            <input placeholder="Longitude" value={form?.location?.lng || ''} onChange={(e) => setForm({ ...form, location: { ...form.location, lng: e.target.value } })} />
            <input placeholder="Power Output" value={form.powerOutput || ''} onChange={(e) => setForm({ ...form, powerOutput: e.target.value })} />
            <select value={form.status || 'ACTIVE'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            <select value={form.connectorType || ''} onChange={(e) => setForm({ ...form, connectorType: e.target.value })}>
              <option value="">Select Connector</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>
              <option value="Type2">Type2</option>
              <option value="Tesla">Tesla</option>
            </select>
            <div className={styles.actions}>
              <button type="submit">Save</button>
              <button onClick={() => setForm(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}