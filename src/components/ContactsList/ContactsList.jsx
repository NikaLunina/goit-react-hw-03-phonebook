import css from './ContactsList.module.css'
import PropTypes from 'prop-types';
export const ContactsList = ({ contacts, onClickDelete }) => (
  <div>
    <ul className={css.list}>
      {contacts.map((contact, id) => (
        <li key={id} className={css.item}>
          {contact.name}: {contact.number}
          <button className={css.button} type="button" onClick={() => onClickDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);


ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onClickDelete: PropTypes.func.isRequired,
};