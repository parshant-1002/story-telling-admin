import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { FieldSchema } from '../../../../Shared/components/CustomDetailsBoard/CustomDetailsBoard';
import {
  DATE_FORMATS,
  INPUT_TYPES,
  STRINGS,
} from '../../../../Shared/constants';

// libs

// consts
import FileRenderer from '../../../../Shared/components/form/FileUpload/FileRenderer';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';
import { convertToLocale } from '../../../../Shared/utils/functions';
import { InvoiceIcon, arrowRight, downArrow } from '../../../../assets';
import { UserBid, ViewMultiData } from './model';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 2;

const USER_DETAILS_SCHEMA: FieldSchema[] = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email', truncate: true },
  { label: 'Phone No.', key: 'phoneNumber' },
  { label: 'Address', key: 'address', truncate: true },
  { label: 'Total Bids', key: 'bidBalance', format: true },
  { label: 'Ongoing Auction', key: 'ongoingAuctions', format: true },
  { label: 'Auction Won', key: 'auctionsWon', format: true },
  { label: 'Referral Bids Earned', key: 'referralBidsEarned', format: true },
  {
    label: 'Joining Date',
    key: 'createdAt',
    render: (value: string | number | undefined) =>
      moment(value).format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  { label: 'No. Of Users Referred', key: 'referredFriendsCount', format: true },
  { label: 'Total Spent', key: 'totalSpent', currencyFormat: true },
];

const UserDetailsTabs = {
  BIDS_PURCHASE_HISTORY: 'Bids Purchase History',
  BIDDING_HISTORY: 'Bidding History',
  AUCTION_HISTORY: 'Auction History',
  PRODUCT_HISTORY: 'Product History',
  REFERRAL_HISTORY: 'Referral History',
};

// Define types for renderActions and column data
interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  sortable?: boolean;
  sortType?: string;
  render?: (
    row: UserBid,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

// Define the shape of the columns
const bidsPurchaseHistoryColumn // renderActions: RenderActions
: ColumnData[] = [
  {
    title: 'Id',
    fieldName: 'id',
    isTruncated: true,
    sortable: true,
    sortType: 'id',
  },
  {
    title: 'Pack Name',
    fieldName: 'packName',
    sortable: true,
    sortType: 'packName',
  },
  {
    title: 'Deal Offer',
    fieldName: 'dealOffer',
    render: (_, val) => `${convertToLocale(val)} %`,
    sortable: true,
    sortType: 'dealOfferPercentage',
  },
  {
    title: 'Deal Price (SEK)',
    fieldName: 'dealPrice',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'price',
  },
  {
    title: 'Bids Received',
    fieldName: 'bids',
    sortable: true,
    sortType: 'bids',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Date',
    fieldName: 'date',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'Status',
    fieldName: 'status',
    sortable: true,
    sortType: 'status',
  },
  {
    title: STRINGS.INVOICE,
    sortable: true,
    sortType: 'invoiceDate',
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? (
          <button
            type="button"
            className="cursor-pointer btn44 btn-primary"
            onClick={() => window.open(row?.invoiceURL, '_blank')}
          >
            <img src={InvoiceIcon} alt="" />
          </button>
        ) : (
          '-.-'
        )}
      </div>
    ),
  },
];

const biddingHistoryColumn // renderActions: RenderActions
: ColumnData[] = [
  {
    title: 'Auction Id',
    fieldName: 'auctionId',
    sortable: true,
    sortType: 'auctionId',
  },
  {
    title: 'Auction Name',
    fieldName: 'auctionName',
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: 'Bid Spent',
    fieldName: 'bidsSpent',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Date',
    fieldName: 'date',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'Item Price (SEK)',
    fieldName: 'itemPrice',
    sortable: true,
    sortType: 'currentBidPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Status',
    fieldName: 'status',
  },
];

const productHistoryColumn = (
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>
): ColumnData[] => [
  {
    title: 'Auction Id',
    fieldName: 'auctionId',
    isTruncated: true,
    sortable: true,
    sortType: 'auctionId',
  },
  {
    title: 'Auction Name',
    fieldName: 'auctionName',
    isTruncated: true,
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: 'Product Name',
    fieldName: 'productName',
    isTruncated: true,
    sortable: true,
    sortType: 'productName',
  },
  {
    title: 'Product Id',
    fieldName: 'productId',
    isTruncated: true,
    sortable: true,
    sortType: 'productId',
  },
  {
    title: 'Product Price (SEK)',
    fieldName: 'productPrice',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: 'Date',
    fieldName: 'date',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      val ? moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME) : '_',
  },
  {
    title: 'Images',
    fieldName: 'images',
    render: (_, val) => {
      const imgData = val as unknown as {
        _id: string;
        url: string;
        title: string;
      }[];
      return (
        <div className="d-inline-flex align-items-center position-relative uploaded_file">
          {imgData?.map((img, index) =>
            index < COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
              <figure key={img.url}>
                <FileRenderer fileURL={img.url} />
                {/* <span>{img.title}</span> */}
              </figure>
            ) : null
          )}
          {imgData?.length > COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
            <button
              type="button"
              className="count_btn"
              onClick={() =>
                setShowMultiItemView({
                  show: true,
                  data: { title: 'Product Images', size: 'lg', imgData },
                })
              }
            >
              {`+${imgData.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW}`}
            </button>
          ) : null}
        </div>
      );
    },
  },
  {
    title: STRINGS.INVOICE,
    sortable: true,
    sortType: 'invoiceDate',
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? (
          <button
            type="button"
            className="cursor-pointer btn44 btn-primary"
            onClick={() => window.open(row?.invoiceURL, '_blank')}
          >
            <img src={InvoiceIcon} alt="" />
          </button>
        ) : (
          '-.-'
        )}
      </div>
    ),
  },
];

export const auctionHistoryColumn = (
  selectedRow: string | null
): ColumnData[] => [
  {
    title: 'Auction Id',
    fieldName: 'auctionId',
    isTruncated: true,
    sortable: true,
    sortType: 'auctionId',
  },
  {
    title: 'Auction Name',
    fieldName: 'auctionName',
    isTruncated: true,
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: 'Bid Spent',
    fieldName: 'bidSpent',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'totalBids',
  },
  {
    title: 'Reserve Price (SEK)',
    fieldName: 'reservePrice',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'reservePrice',
  },
  {
    title: 'No. Of Days',
    fieldName: 'days',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Item Price (SEK)',
    fieldName: 'price',
    sortable: true,
    sortType: 'itemPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Start Date',
    fieldName: 'startDate',
    sortable: true,
    sortType: 'bidStartDate',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'End Date',
    fieldName: 'endDate',
    sortable: true,
    sortType: 'reserveWaitingEndDate',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'Winner',
    fieldName: 'winner',
    sortable: true,
    sortType: 'winnerName',
  },
  {
    title: 'Status',
    fieldName: 'status',
    render: (row, val) => (
      <div>
        {val}
        <img
          src={selectedRow?.includes(row._id || '') ? downArrow : arrowRight}
          alt=""
          className="ps-"
          width={20}
        />
      </div>
    ),
  },
];

const referralHistoryColumn: ColumnData[] = [
  {
    title: 'Name',
    fieldName: 'name',
    isTruncated: true,
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Email',
    fieldName: 'email',
    isTruncated: true,
    sortable: true,
    sortType: 'email',
  },
  {
    title: 'Phone No.',
    fieldName: 'phoneNumber',
    sortable: true,
    sortType: 'phoneNumber',
  },
  {
    title: 'Address',
    fieldName: 'address',
    isTruncated: true,
    sortable: true,
    sortType: 'address',
  },
  {
    title: 'Referral Amount (SEK)',
    fieldName: 'referralAmount',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'referralAmount',
  },
  {
    title: 'Joining Date',
    fieldName: 'joiningDate',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
];

const auctionBiddingHistoryColumn // renderActions: RenderActions
: ColumnData[] = [
  {
    title: 'Bid Id',
    fieldName: 'id',
    sortable: true,
    sortType: 'id',
  },
  {
    title: 'Purchase History',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'Item Price (SEK)',
    fieldName: 'bids',
    sortable: true,
    sortType: 'currentBidPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Status',
    fieldName: 'status',
  },
];
// Define the shape of CONFIRMATION_DESCRIPTION
const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};

const BID_CREDIT_TYPES = {
  PURCHASE: 1,
  GIFT: 2,
  REFERRAL: 3,
  BONUS: 4,
  REFUND: 5,
};

const BID_CREDIT_TYPES_OPTIONS = [
  { label: 'PURCHASE', value: BID_CREDIT_TYPES.PURCHASE },
  { label: 'GIFT', value: BID_CREDIT_TYPES.GIFT },
  { label: 'REFERRAL', value: BID_CREDIT_TYPES.REFERRAL },
  { label: 'BONUS', value: BID_CREDIT_TYPES.BONUS },
  { label: 'REFUND', value: BID_CREDIT_TYPES.REFUND },
];

const BID_STATUS = {
  CONFIRMED: 1,
  REFUNDED: 2,
};

const BID_STATUS_OPTIONS = [
  { label: 'CONFIRMED', value: BID_STATUS.CONFIRMED },
  { label: 'REFUNDED', value: BID_STATUS.REFUNDED },
];
const AUCTION_STATUS = {
  PENDING: 1, // awaiting bidding
  ACTIVE: 2, // bidding active
  ENDED: 3, // bidding ended
  REFUNDED: 4,
};

const AUCTION_HISTORY_FRONTEND = {
  COMPLETED: 1, // Active, Ended
  REFUNDED: 2, // Cancelled
};

const AUCTION_HISTORY_FRONTEND_OPTIONS = [
  { label: 'COMPLETED', value: AUCTION_HISTORY_FRONTEND.COMPLETED },
  { label: 'REFUNDED', value: AUCTION_HISTORY_FRONTEND.REFUNDED },
];
const ADD_BIDS_FORM_SCHEMA = {
  bids: {
    type: INPUT_TYPES.NUMBER,
    label: 'Add Bids',
    className: 'col-md-12',
    placeholder: 'Add Bids',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
};
export {
  ADD_BIDS_FORM_SCHEMA,
  AUCTION_HISTORY_FRONTEND_OPTIONS,
  AUCTION_STATUS,
  BID_CREDIT_TYPES,
  BID_CREDIT_TYPES_OPTIONS,
  BID_STATUS,
  BID_STATUS_OPTIONS,
  CONFIRMATION_DESCRIPTION,
  USER_DETAILS_SCHEMA,
  UserDetailsTabs,
  auctionBiddingHistoryColumn,
  biddingHistoryColumn,
  bidsPurchaseHistoryColumn,
  productHistoryColumn,
  referralHistoryColumn,
};
