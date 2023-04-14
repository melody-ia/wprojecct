<?
	include_once('./_common.php');
	include_once(G5_THEME_PATH.'/_include/wallet.php');
	include_once(G5_THEME_PATH.'/_include/gnb.php');
	include_once(G5_PATH.'/util/package.php');
	include_once(G5_LIB_PATH.'/fcm_push/set_fcm_token.php');
    include_once(G5_PATH.'/lib/guzzle/vendor/autoload.php');
    

	login_check($member['mb_id']);
    $member_info = sql_fetch("SELECT * FROM g5_member_info WHERE mb_id ='{$member['mb_id']}' order by date desc limit 0,1 ");
    
?>

<link rel="stylesheet" href="<?=G5_THEME_URL?>/css/default.css">
<script src="<?=G5_URL?>/js/common.js"></script>


<?php
		if(defined('_INDEX_')) { // index에서만 실행
			include G5_BBS_PATH.'/newwin.inc.php'; // 팝업레이어
		}

	?>


<?include_once(G5_THEME_PATH.'/_include/breadcrumb.php');?>
<main>
    <div class='container dashboard'>
        <!-- <div class="my_btn_wrap">
            <div class='row'>
                <div class='col-lg-6 col-12'>
                    <button type='button' class='btn wd main_btn b_sub' onclick="go_to_url('mywallet');"> 내 지갑</button>
                </div>
                <div class='col-lg-6 col-12'>
                    <button type='button' class='btn wd main_btn b_main' onclick="go_to_url('upstairs');">패키지구매</button>
                </div>
               
            </div>
        </div> -->

        <div>

        <?
            $api = 'f54c06f6ed4647c3a1659249b976333b';
            $end_point = "https://goerli.infura.io/v3/f54c06f6ed4647c3a1659249b976333b";

        ?>

        </div>



        <div class='r_card_wrap content-box round mt30'>
            <div class="card_title">내 주소
                <a href='<?=G5_URL?>/page.php?id=upstairs' class='f_right inline more'><span>더보기<i class="ri-add-circle-fill"></i></span></a>
            </div>
            <?=$member['mb_wallet']?>
        </div>


        <div class='r_card_wrap content-box round history_latest'>
            <div class="card_title_wrap">
                <div class="card_title">NFT'S ASSETS </div>
                <a href='<?=G5_URL?>/page.php?id=bonus_history'
                    class='inline more'><span>더보기<i class="ri-add-circle-fill"></i></span></a>
            </div>
           <?
            if($member['mb_wallet'] != ''){
                $nfts = $ethereumClient->GetSingleNfts([
                    "contract_address" => $member['mb_wallet'],
                    "includeMetadata" => true,
                    "offset" => 0,
                    "limit" => 10
                ]);
                $sample_img = $nfts['payload']['data'][0]['meta']['data']['image'];
            }
           ?>

           <img src="<?=$sample_img?>"/>
        </div>

        
    </div>
</main>

<? include_once(G5_THEME_PATH.'/_include/tail.php'); ?>