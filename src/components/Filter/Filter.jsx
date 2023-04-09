import css from './Filter.module.css'
import PropTypes from 'prop-types';
export const Filter = ({ onFilter, filter }) => {
  return (
    <div className={css.filtercontainer}>
      <p className={css.title}>Find Contacts by name</p>
      <label>
        <input className={css.input}
          type="text"
          name="filter"
          placeholder="Enter name"
          onChange={onFilter}
          value={filter}
        />
      </label>
    </div>
  );
};


Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};