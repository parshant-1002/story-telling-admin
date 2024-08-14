import { daysBetweenDates } from '../../../../Shared/utils/functions';
import { AUCTION_STATUS, BID_CREDIT_TYPES, BID_STATUS } from './constants';
import {
  UserReferralHistoryResponse,
  UserBiddingHistoryResponse,
  UserBidsCreditHistoryResponse,
  UserProductHistoryResponse,
  UserAuctionHistoryResponse,
} from './model';

export function getKeyByValue<T extends Record<string, number>>(
  obj: T,
  value: T[keyof T]
): keyof T | undefined {
  return (Object.keys(obj) as Array<keyof T>).find((key) => obj[key] === value);
}

function getAuctionStatusText(auctionHistory: {
  auctionDetails: { status: number };
}) {
  // Check if auctionHistory and auctionDetails are defined
  if (auctionHistory && auctionHistory.auctionDetails) {
    const { status } = auctionHistory.auctionDetails;

    // Determine status text based on status value
    if (status === AUCTION_STATUS.PENDING) {
      return 'PENDING';
    }
    if (status === AUCTION_STATUS.ACTIVE || status === AUCTION_STATUS.ENDED) {
      return 'CONFIRMED';
    }
    return 'REFUNDED';
  }

  // Default return value if auctionHistory or auctionDetails is undefined
  return 'REFUNDED';
}

const transformBidderPurchaseResponse = (
  data: UserBidsCreditHistoryResponse
) => {
  return {
    data: data?.data?.map((bidsPurchaseHistory) => ({
      id: bidsPurchaseHistory?.id,
      packName: bidsPurchaseHistory?.bidPlan?.title,
      dealOffer: bidsPurchaseHistory?.bidPlan?.dealOffer,
      dealPrice: bidsPurchaseHistory?.bidPlan?.dealPrice,
      bids: bidsPurchaseHistory?.bids,
      date: bidsPurchaseHistory?.createdAt,
      status: getKeyByValue(BID_CREDIT_TYPES, bidsPurchaseHistory?.type),
    })),
    count: data?.count,
  };
};

const transformBiddingHistoryResponse = (data: UserBiddingHistoryResponse) => {
  return {
    data: data?.data?.map((biddingHistory) => ({
      id: biddingHistory?.id,
      auctionName: biddingHistory?.auctionDetails?.title,
      itemPrice: biddingHistory?.productDetails?.price,
      bidsSpent: biddingHistory?.bids,
      date: biddingHistory?.createdAt,
      status: getKeyByValue(BID_STATUS, biddingHistory?.status),
    })),
    count: data?.count,
  };
};
const transformProductHistoryResponse = (data: UserProductHistoryResponse) => {
  return {
    data: data?.data?.map((productHistory) => ({
      auctionId: productHistory?.auction?.id,
      productId: productHistory?.product?.id,
      auctionName: productHistory?.auction?.title,
      productName: productHistory?.product?.title,
      productPrice: productHistory?.purchasedPrice,
      date: productHistory?.createdAt,
      images: productHistory?.product?.images,
    })),
    count: data?.count,
  };
};
const transformReferralHistoryResponse = (
  data: UserReferralHistoryResponse
) => {
  return {
    data: data?.data?.map((referralHistory) => ({
      id: referralHistory?.id,
      name: referralHistory?.name,
      email: referralHistory?.email,
      referralAmount: referralHistory?.referralAmount,
      phoneNumber: referralHistory?.phoneNumber,
      address: referralHistory?.address,
      date: referralHistory?.createdAt,
    })),
    count: data?.count,
  };
};

const transformAuctionHistoryResponse = (data: UserAuctionHistoryResponse) => {
  return {
    data: data?.data?.map((auctionHistory) => ({
      _id: auctionHistory?._id,
      id: auctionHistory?.auctionDetails?.id,
      auctionName: auctionHistory?.auctionDetails?.title,
      productName: auctionHistory?.product?.title,
      bidSpent: auctionHistory?.totalBids,
      reservePrice: auctionHistory?.auctionDetails?.reservePrice,
      startDate: auctionHistory?.auctionDetails?.bidStartDate,
      endDate: auctionHistory?.auctionDetails?.reserveWaitingEndDate,
      status: getAuctionStatusText(auctionHistory),
      price: auctionHistory?.itemPrice,
      winner: auctionHistory?.winnerName,
      days: daysBetweenDates(
        new Date(auctionHistory?.auctionDetails?.bidStartDate),
        new Date(auctionHistory?.auctionDetails?.reserveWaitingEndDate)
      ),
    })),
    count: data?.count,
  };
};

export {
  transformBidderPurchaseResponse,
  transformBiddingHistoryResponse,
  transformProductHistoryResponse,
  transformReferralHistoryResponse,
  transformAuctionHistoryResponse,
};
