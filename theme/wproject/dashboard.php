<?
	include_once('./_common.php');
	include_once(G5_THEME_PATH.'/_include/wallet.php');
	include_once(G5_THEME_PATH.'/_include/gnb.php');
	include_once(G5_PATH.'/util/package.php');
	include_once(G5_LIB_PATH.'/fcm_push/set_fcm_token.php');
    // include_once(G5_PATH.'/lib/guzzle/vendor/autoload.php');
    

	login_check($member['mb_id']);
    $member_info = sql_fetch("SELECT * FROM g5_member_info WHERE mb_id ='{$member['mb_id']}' order by date desc limit 0,1 ");
    
?>

<link rel="stylesheet" href="<?=G5_THEME_URL?>/css/default.css">
<script src="<?=G5_URL?>/js/common.js"></script>
<script type="text/javascript" src="./js/qrcode.js"></script>

<?php
		if(defined('_INDEX_')) { // index에서만 실행
			include G5_BBS_PATH.'/newwin.inc.php'; // 팝업레이어
		}

	?>


<?
/*include_once(G5_THEME_PATH.'/_include/breadcrumb.php');*/
?>


<style>
    .qrBox{text-align:center;}
    .qrBox img{background:white;padding:20px;margin:0 auto;}

    .content-box .nft_asset{text-align:center}
    .content-box img{margin:0 auto}
</style>

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

        <?if(empty($member['mb_wallet'])){
            $wallet_data = shell_exec("node /var/www/html/wproject/lib/Infura/nft.js");
            $wallet_data =  mb_convert_encoding($wallet_data, "UTF-8", "euc-kr");
            $wallet_result = json_decode($wallet_data);
   
            $wallet_sql = "UPDATE {$g5['member_table']} SET mb_wallet = '{$wallet_result->address}' WHERE mb_id = '{$member['mb_id']}'";
            $key_sql = "INSERT INTO blocksdk_member_eth_addresses SET id = '{$member['mb_no']}', private_key = '{$wallet_result->privateKey}'";

            sql_query($wallet_sql);
            sql_query($key_sql);

            $member['mb_wallet'] = $wallet_result->address;
        } ?>

        </div>



        <div class='r_card_wrap content-box round mt30'>
            <div class="card_title mb20">NFT WALLET 주소</div>

            <div class="wallet qrBox col-12 mb20">
              <div class="eth_qr_img qr_img" id="my_eth_qr"></div>
            </div> 

            <div class='qrBox_right col-12'>
                <input type="text" id="my_eth_wallet" class="wallet_addr text-center" value="<?=$member['mb_wallet'] ?>" title='my address' disabled/>
                <button class="btn wd line_btn" id="accountCopy" onclick="copyURL('#my_eth_wallet')">
                    <span >주소복사</span>
                </button>
            </div>  
        </div>


        <div class='r_card_wrap content-box round history_latest'>
            <div class="card_title_wrap">
                <div class="card_title">NFT'S ASSETS </div>
                <!-- <a href='<?=G5_URL?>/page.php?id=bonus_history'
                    class='inline more'><span>더보기<i class="ri-add-circle-fill"></i></span></a> -->
            </div>
           <?
            $auth_data = shell_exec("node /var/www/html/wproject/lib/Infura/auth.js wallet=$wallet_result->address+key=$wallet_result->privateKey");
           ?>
           <div class='nft_asset'>
            <img src="<?=print_r($auth_data)?>"/>
           </div>
        </div>

        
    </div>
</main>



<script>
  
  $(function() {
    /* if(debug){
      console.log('[ Mode : debug ]');
      $('#Withdrawal_btn').attr('disabled',false);
    } */

    // 회사 지갑사용
    var eth_wallet_addr = '<?=$member['mb_wallet']?>';
    if(eth_wallet_addr != ''){
        $('#eth_wallet_addr').val(eth_wallet_addr);
        generateQrCode("my_eth_qr",eth_wallet_addr, 80, 80);
    }

    });

    
  function copyURL(addr) {
    dialogModal("","<p>지갑주소가 복사 되었습니다.</p>","success");

    var temp = $("<input>");
    $("body").append(temp);
    temp.val($(addr).val()).select();
    document.execCommand("copy");
    temp.remove();
  }

  //  QR코드
  function generateQrCode(qrImg, text, width, height){
      return new QRCode(document.getElementById(qrImg), {
          text: text,
          width: width,
          height: height,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
      });
  } 

</script>

<? include_once(G5_THEME_PATH.'/_include/tail.php'); ?>