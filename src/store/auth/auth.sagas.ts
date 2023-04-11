import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { API_ROUTES, IOrganization, IProfile } from "src/shared";
import axiosInt from "src/utils/callApi";
import { setLoading, handleError } from "../global";
import { getAdditionalMembersRequest, getOrganizationRequest, getSitesRequest, getUserProfileRequest, setAdditionalMembersState, setOrganizationState, setSitesState, setUserProfileState } from "./auth.actions";
import { GET_ADDITAIONAL_MEMBERS_REQUEST, GET_ORGANIZATION_REQUEST, GET_SITES_REQUEST, GET_USER_PROFILE_REQUEST } from "./auth.actiontypes";

function* getUserProfile(action: ReturnType<typeof getUserProfileRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const { _id, email, role } = action.payload;
    const api = role === 'provider' ? `${API_ROUTES.getProvider}/${_id}/${email}` : `${API_ROUTES.getProfile}/${_id}`
    const response: AxiosResponse<any> = yield call(() => axiosInt.get(api));
    yield put(setUserProfileState(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getOrganization(action: ReturnType<typeof getOrganizationRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const api = `${API_ROUTES.organizationDetails}/${action.payload}`
    const response: AxiosResponse<any> = yield call(() => axiosInt.get(api));
    if (response.data && response.data.length) {
      const dd: IOrganization = {
        ...response.data[0].organisation, catInfo: response.data[0].cat, approvalPending: response.data[0].approvalPending || false
      }
      yield put(setOrganizationState(dd));
    }
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getSites(action: ReturnType<typeof getSitesRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const { orgId, uid } = action.payload;
    const api = `${API_ROUTES.site}/${orgId}/${uid}`;
    const response: AxiosResponse<any> = yield call(() => axiosInt.get(api));
    yield put(setSitesState(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getAdditionalMembers(action: ReturnType<typeof getAdditionalMembersRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<any> = yield call(() =>
      axiosInt.get(`${API_ROUTES.additionalMember}?userId=${action.payload}`)
    );
    const additionalMembers: IProfile[] = [];
    if (response.data && response.data.providerInfo && response.data.providerInfo.length) {
      additionalMembers.push(...response.data.providerInfo);
    }
    if (response.data && response.data.approvalPending && response.data.approvalPending.length) {
      const pendingMembers: IProfile[] = response.data.approvalPending.map((s: any) => {
        return { ...s, approvalPending: true, rec: true, recText: `${s.method} request send for this user` }
      });
      additionalMembers.push(...pendingMembers);
    }
    yield put(setAdditionalMembersState(additionalMembers));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(GET_USER_PROFILE_REQUEST, getUserProfile),
    takeEvery(GET_ORGANIZATION_REQUEST, getOrganization),
    takeEvery(GET_SITES_REQUEST, getSites),
    takeEvery(GET_ADDITAIONAL_MEMBERS_REQUEST, getAdditionalMembers)
  ]);
}
