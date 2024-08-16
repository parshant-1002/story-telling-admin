import TruncateText from '../TruncateText';

export interface FieldSchema {
  label: string;
  key: keyof DataKeys;
  truncate?: boolean;
  render?: (
    value: string | number | undefined,
    data: DataKeys
  ) => React.ReactNode;
}

export interface DataKeys {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: string;
  auctionsWon?: number;
  referralBidsEarned?: number;
  bidBalance?: number;
  ongoingAuctions?: number;
  totalSpent?: number;
  referredFriendsCount?: number;
}

interface CustomProfileProps {
  schema: FieldSchema[];
  data: DataKeys;
}

function CustomDetailsBoard({ schema, data }: CustomProfileProps) {
  const renderFieldValue = (field: FieldSchema) => {
    const value = data[field.key];

    if (field.render) {
      return field.render(value, data);
    }

    if (field.truncate && typeof value === 'string') {
      return <TruncateText text={value || `No ${field.label}`} />;
    }
    if (typeof value === 'number') {
      return value;
    }
    return value || `---`;
  };
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="row border p-3 m-0">
        {schema.map((field) => (
          <div key={field.label} className="col-md-3 mb-3">
            <label className="font-weight-bold">{field.label}</label>
            <p>{renderFieldValue(field)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomDetailsBoard;
